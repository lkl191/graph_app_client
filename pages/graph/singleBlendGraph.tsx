import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAuthState } from "react-firebase-hooks/auth";
import { SINGLE_BLEND_GRAPH } from "../../components/graphql/query";
import { Auth } from "../../context/auth";
import { DatasetsType } from "../../types/types";

const SingleBlendGraph = () => {
  let userExact = false;
  const [user] = useAuthState(Auth);

  const router = useRouter();
  const id = router.query.id;

  const [getBlendGraph, { error, data }] = useLazyQuery(SINGLE_BLEND_GRAPH, {
    variables: { id },
  });
  if (error) return <p>error... {error.message}</p>;
  useEffect(() => {
    if (id) {
      getBlendGraph();
    }
  }, [id]);
  let props;
  if (data) {
    props = data.singleBlendGraph;
  }
  console.log(props);

  const genLabels = () => {
    let labels = [];
    for (let i = 0; i < props.graphs[0].data.length; i++) {
      labels[i] = props.graphs[0].data[i].label;
    }
    return labels;
  };

  const genDatasets = () => {
    let datasets = [];
    const color = `192, 192, 192`;

    const graph = props.graphs;

    for (let i = 0; i < graph.length; i++) {
      let values = [];
      for (let ii = 0; ii < graph[i].data.length; ii++) {
        values[ii] = graph[i].data[ii].value;
      }
      const newData: DatasetsType = {
        label: graph[i].title,
        type: graph[i].graphKind.toLowerCase(),
        backgroundColor: `rgba(${color},0.4)`,
        data: values,
      };
      console.log(values)
      datasets.push(newData);
    }

    return datasets;
  };

  let datasets;
  if (props) {
    datasets = {
      labels: genLabels(),
      datasets: genDatasets(),
    };
    return (
        <div className="container">
            <h1>{props.title}</h1>
          <Bar data={datasets} type="bar" />
        </div>
      );
  } else {
      return (
          <div className="container">
              <p>Loading...</p>
          </div>
      )
  }

  
};

export default SingleBlendGraph;
