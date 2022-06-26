import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { MY_BLEND_GRAPH, MY_GRAPHS } from "../components/graphql/query";
import { AuthContext } from "../context/auth";
import GraphHeadline from "../components/graph/GraphHeadline";
import { BlendGraph, Graph, GraphType } from "../types/types";

const UserGraph = () => {
  const [getOwnGraphs, { data, error }] = useLazyQuery<{ myGraphs: Graph[] }>(MY_GRAPHS);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      getOwnGraphs();
    }
  }, [user]);

  if (error) return <p>{error.message} </p>;
  if (data) {
    const graphs = data.myGraphs;
    return (
      <div className="container">
        <h2>My Graph</h2>
        <GraphHeadline graphs={graphs} />
        <Link href={`/graph/create-graph`}>
          <a>
            <div className="crt_graph">+ グラフ作成</div>
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  }
};

const UserBlendGraph = () => {
  const [getOwnBlendGraphs, { data, error }] = useLazyQuery<{ myBlendGraphs: BlendGraph[] }>(MY_BLEND_GRAPH);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      getOwnBlendGraphs();
    }
  }, [user]);
  if (error) return <p>{error.message} </p>;

  if (data) {
    const props = data.myBlendGraphs;
    return (
      <div className="container">
        <h1>MyBlendGraph</h1>
        {props.map((e) => (
          <div key={e.id}>
            <Link href={`/graph/singleBlendGraph?id=${e.id}`}>
              <a>
                <h3 className="graph-index">
                  <div className="flex">
                    <div>
                      <span className="graph_title">{e.title}</span>
                    </div>
                  </div>
                </h3>
              </a>
            </Link>
            <br></br>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  }
};

const UserGraphHandler = () => {
  const [graphType, setGraphType] = useState<GraphType>("NORMAL");
  const changeGraphType = useCallback((e) => {
    setGraphType(e.target.name as GraphType);
  }, [])

  return (
    <div className="container">
      <br></br>
      <button className="button" name="NORMAL" onClick={changeGraphType}>
        グラフ一覧
      </button>
      <button className="button" name="BLEND" onClick={changeGraphType}>
        複合グラフ一覧
      </button>
      <section>
        <ul>
          {(() => {
            switch (graphType) {
              case "NORMAL":
                return <UserGraph />;
              case "BLEND":
                return <UserBlendGraph />;
            }
          })()}
        </ul>
      </section>
    </div>
  );
};

export default UserGraphHandler;
