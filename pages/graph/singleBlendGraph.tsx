import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DeleteBlendGraphProps } from "../../components/graph/deleteGraph";
import { SINGLE_BLEND_GRAPH } from "../../components/graphql/query";
import { AuthContext } from "../../context/auth";
import { useQueryParams } from "../../hooks/useQueryParams";
import { BlendGraph, DatasetsType } from "../../types/types";

const DeleteModal = () => {
  const id = useQueryParams("id")
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow((props) => !props);
  };
  return (
    <span>
      <button className="button delete_button" onClick={openModal}>
        削除
      </button>
      <DeleteBlendGraphProps id={id} show={show} setShow={setShow} />
    </span>
  );
};

const SingleBlendGraph = () => {
  const [isHost, setIsHost] = useState(false)
  const { user } = useContext(AuthContext)

  const id = useQueryParams("id")

  const [getBlendGraph, { error, data }] = useLazyQuery<{ singleBlendGraph: BlendGraph }>(SINGLE_BLEND_GRAPH, {
    variables: { id },
  });
  useEffect(() => {
    if (id) {
      getBlendGraph();
    }
  }, [id]);

  if (error) return <p>error... {error.message}</p>;
  if (data) {
    const blendGraph = data.singleBlendGraph;
    if (!isHost && user && blendGraph.userId && user.uid === blendGraph.userId) {
      setIsHost(true)
    }
    const genLabels = () => {
      let labels: string[] = [];
      for (let i = 0; i < blendGraph.graphs[0].data.length; i++) {
        labels[i] = blendGraph.graphs[0].data[i].label;
      }
      return labels;
    };

    const genDatasets = () => {
      let datasets = [];

      const graph = blendGraph.graphs;

      for (let i = 0; i < graph.length; i++) {
        let color = graph[i].color;
        if (!color) {
          color = "75,192,192";
        }
        let values: number[] = [];
        for (let ii = 0; ii < graph[i].data.length; ii++) {
          values[ii] = graph[i].data[ii].value;
        }
        const newData: DatasetsType = {
          label: graph[i].title,
          type: graph[i].graphKind.toLowerCase(),
          backgroundColor: `rgba(${color},0.4)`,
          borderColor: `rgba(${color},1)`,
          pointBorderColor: `rgba(${color},1)`,
          pointHoverBackgroundColor: `rgba(${color},1)`,
          data: values,
        };
        datasets.push(newData);
      }

      return datasets;
    };

    const datasets = {
      labels: genLabels(),
      datasets: genDatasets(),
    };

    return (
      <div className="container">
        <h1>{blendGraph.title}</h1>
        {isHost && <DeleteModal />}
        <Bar data={datasets} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }
};

export default SingleBlendGraph;
