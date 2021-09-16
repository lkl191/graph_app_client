import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ReactDataSheet from "react-datasheet";

import {
  CREATE_BLEND_GRAPH,
  CREATE_GRAPH,
} from "../../components/graphql/mutation";
import { useForm, useDataForm } from "../../utils/hooks";
import PreviewGraph from "../../components/preview/preview-graph";
import "react-datasheet/lib/react-datasheet.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../../context/auth";
import { SINGLE_GRAPH } from "../../components/graphql/query";
import PreviewBlend from "../../components/preview/previewBlend";
import Test from "../../components/test";
import { Bar } from "react-chartjs-2";
import { DatasetsType } from "../../types/types";

const NewCreateGraph = () => {
  const [user] = useAuthState(Auth);
  //1.Stateを作る
  const { input, onChange, onSubmit }: any = useForm(createGraphCallback, {
    title: "",
    category: "",
    graphKind: "LINE",
    source: "",
    label: [""],
    value: [0],
  });

  //3.MutationをBEに送る
  const [createGraph, { error }] = useMutation(CREATE_GRAPH, {
    variables: input,
    //Mutationの実行後
    onCompleted() {
      location.href = "/";
      console.log("graph is created");
    },
  });
  //console.log(input)
  //グラフ作成エラー
  if (error) {
    return <p>{error.message}</p>;
  }

  //2
  function createGraphCallback() {
    input.label = inputData.label;
    const props = inputData.value;
    for (let i = 0; i < props.length; i++) {
      input.value[i] = Number(props[i]);
    }
    console.log(input);
    createGraph();
  }

  //datasheet

  const grid = [[], []];
  const generateGrid = () => {
    for (let ii = 0; ii < 30; ii++) {
      grid[0][ii] = { value: null };
      grid[1][ii] = { value: null };
    }
    for (let i = 0; i < 3; i++) {
      grid[0][i] = { value: `test0${i}` };
      grid[1][i] = { value: i };
    }
  };
  generateGrid();

  //1
  // データの初期値
  const { inputData, dataChange }: any = useDataForm({
    label: ["test00", "test01", "test02"],
    value: [0, 1, 2],
  });
  const [dataSh, setDataSh] = useState(grid);

  return (
    <div className="container">
      {!user && <p className="attention">ログインしてください。</p>}
      <h2>新規グラフ作成</h2>
      <input
        placeholder="title"
        className="input_text"
        name="title"
        value={input.title}
        onChange={onChange}
      />
      <input
        placeholder="category"
        className="input_text"
        name="category"
        value={input.category}
        onChange={onChange}
      />
      <select
        name="graphKind"
        value={input.graphKind}
        onChange={onChange}
        className="graphKind"
      >
        <option value="LINE">折れ線</option>
        <option value="BAR">棒</option>
        <option value="PIE">円</option>
        <option value="RADAR">レーダー</option>
      </select>

      <button
        type="submit"
        className={["button create_btn", !user && "click_invalid"].join(" ")}
        onClick={(e) => {
          if (user) {
            onSubmit(e);
          } else {
            return <p>ログインしてください。</p>;
          }
        }}
      >
        create
      </button>

      <PreviewGraph graphInfo={input} inputData={inputData} />

      <div>
        <input
          placeholder="source URL"
          className="input_text"
          name="source"
          value={input.source}
          onChange={onChange}
        />
      </div>

      <ReactDataSheet
        data={dataSh}
        valueRenderer={(cell) => cell.value}
        className="sheet-container"
        onCellsChanged={(changes) => {
          //console.log(changes)//入力したrow,col,valueのみ
          const newGrid = dataSh.map((row) => [...row]);

          changes.forEach(({ cell, row, col, value }) => {
            newGrid[row][col] = { ...newGrid[row][col], value };
          });
          dataChange(newGrid);
          setDataSh(newGrid);
        }}
      />
    </div>
  );
};

const BlendCreateGraph = () => {
  let graphInfo;
  const { input, onChange, onSubmit }: any = useForm(blendGraphSetCallback, {
    id: "",
  });

  const [blendGraphSet, { data }] = useLazyQuery(SINGLE_GRAPH, {
    variables: { id: input.id },
  });

  const [idArray, setIdArray] = useState([]);
  const [title, setTitle] = useState();

  const [createBlendGraph, { error }] = useMutation(CREATE_BLEND_GRAPH, {
    variables: {
      graphId: idArray,
      title,
    },
  });

  useEffect(() => {
    if (input.id) {
      setIdArray([...idArray, input.id]);
    }
  }, [input.id]);

  let [dataArray, setDataArray] = useState([]);

  function blendGraphSetCallback() {
    blendGraphSet();
  }

  let [graphData, setGraphData] = useState([
    {
      labels: [],
      values: [],
    },
  ]);

  const color = `192, 192, 192`;

  const pushGraphData = () => {
    let labels = [];
    let values = [];
    for (let i = 0; i < data.singleGraph.data.length; i++) {
      labels[i] = data.singleGraph.data[i].label;
      values[i] = data.singleGraph.data[i].value;
    }
    return {
      labels,
      values,
    };
  };

  useEffect(() => {
    if (data) {
      graphInfo = data.singleGraph;
      setDataArray([...dataArray, graphInfo]);
      setGraphData([...graphData, pushGraphData()]);
    }
  }, [data]);

  //console.log(dataArray);
  //console.log(graphData)

  if (error) console.log(error.message);

  const genLabels = () => {
    let labels = [];
    for (let i = 1; i < graphData.length; i++) {
      labels = graphData[i].labels;
    }

    return labels;
  };

  const genDatasets = () => {
    
    let datasets = [];

    for (let i = 0; i < dataArray.length; i++) {
      const newData: DatasetsType = {
        label: dataArray[i].title,
        type: dataArray[i].graphKind.toLowerCase(),
        backgroundColor: `rgba(${color},0.4)`,
        data: graphData[i + 1].values,
      };

      datasets.push(newData); //新しいグラフのデータ
    }

    return datasets;
  };

  const datasets = {
    labels: genLabels(),
    datasets: genDatasets(),
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div id="blend_graph">
          <button className="button" onSubmit={onSubmit}>
            グラフ検索
          </button>
          <button
            className="button"
            onClick={() => {
              createBlendGraph();
            }}
          >
            作成
          </button>
          <br />
          <input name="id" placeholder="graphId" onChange={onChange} />
          <input
            type="text"
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          {data && <Bar data={datasets} type="Bar" />}
        </div>
      </form>
    </div>
  );
};

const CreateGraph = () => {
  type CreateGraphType = "NEW" | "BLEND";
  const [change, setChange] = useState<CreateGraphType>("NEW");
  const changeCreateGraph = (e) => {
    setChange(e.target.name);
  };
  if (process.browser) {
    return (
      <>
        <div>
          <button
            className="button change_create_graph"
            name="NEW"
            onClick={changeCreateGraph}
          >
            新規グラフ作成
          </button>
          <button
            name="BLEND"
            className="button change_create_graph"
            onClick={changeCreateGraph}
          >
            グラフを重ねる
          </button>
        </div>
        {(() => {
          switch (change) {
            case "NEW":
              return <NewCreateGraph />;
            case "BLEND":
              return <BlendCreateGraph />;
          }
        })()}
      </>
    );
  } else {
    return null;
  }
};

export default CreateGraph;
