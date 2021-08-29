import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";

import { CREATE_GRAPH } from "../../components/graphql/mutation";
import { useForm, useDataForm } from "../../utils/hooks";
import PreviewGraph from "../../components/preview/preview-graph";
import "react-datasheet/lib/react-datasheet.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../../context/auth";

const CreateGraph = () => {
  const [user] = useAuthState(Auth);
  //1.Stateを作る
  const { input, onChange, onSubmit }: any = useForm(createGraphCallback, {
    title: "",
    category: "",
    graphKind: "LINE",
    label: [""],
    value: [0],
  });

  //3.MutationをBEに送る
  const [createGraph, { error }] = useMutation(CREATE_GRAPH, {
    variables: input,
    //Mutationの実行後
    onCompleted() {
      location.href = "/";
      //router.push("/")
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
  //1

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
  const { inputData, dataChange }: any = useDataForm({
    label: ["test01", "test02", "test03"],
    value: [0, 1, 2],
  });
  const [dataSh, setDataSh] = useState(grid);

  //promise(onSubmit, dataSubmit)
  //console.log(input)

  if (process.browser) {
    return (
      <div className="container">
        {!user && <p className="attention">ログインしてください。</p>}
        <h2>create a graph</h2>
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
          className={[
            "button create_btn",
            !user && 'click_invalid'
          ].join(' ')}
          onClick={(e) => {
            if (user) {
              onSubmit(e);
            } else {
              console.log("baka");
              return <p>ログインしてください。</p>;
            }
          }}
        >
          create
        </button>

        <PreviewGraph props={input} inputData={inputData} />

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
  } else {
    return null;
  }
};

export default CreateGraph;
