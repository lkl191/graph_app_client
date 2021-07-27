import React, { useState } from "react";
//import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useLazyQuery, useQuery } from "@apollo/client";

//import { Auth } from "../context/auth";
import { ALL_GRAPHS, GRAPH_CATEGORY } from "./graphql/query";

const GraphList = () => {
  //const [user] = useAuthState(Auth);
  const { error, loading, data } = useQuery(ALL_GRAPHS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error... {error.message}</p>;

  const props = data.allGraphs;
  return (
    <div className="all_graph">
      <h1 className="other-title">Graph一覧</h1>
      <GraphSort />
      <p>グラフ数 {props.length}</p>
      <AllGraph props={props} />
    </div>
  );
};

const AllGraph = ({ props }) => {
  return (
    <div>
      <>
        {props.map((e) => (
          <div key={e.id}>
            <Link href={`/graph/singleGraph?id=${e.id}`}>
              <a>
                <h3 className="graph-index">
                  {e.title}
                  <section>
                    {e.user ? (
                      <span>
                        {/* 表示されない */}
                        by {e.user.email}＞＞＞
                      </span>
                    ) : (
                      <span>Anonymous＞＞＞</span>
                    )}

                    <span>{e.graphKind}</span>
                  </section>
                </h3>
              </a>
            </Link>
            <br></br>
          </div>
        ))}
      </>
    </div>
  );
};

const GraphSort = () => {
  //let category;
  const [category, setCategory] = useState("");
  const [getGraph, { data }] = useLazyQuery(GRAPH_CATEGORY);
  let props;
  if (data) {
    props = data.graphCate;
  }
  return (
    <>
      <input
        type="text"
        className="input_text search_input"
        placeholder="Search Graph"
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        type="submit"
        className="button search"
        onClick={() => {
          //variableは発火時
          getGraph({ variables: { category: category } });
        }}
      >
        検索
      </button>
      {props && (
        <>
          <p>
            グラフ数 {props.length}＞＞＞<span>{category}</span>
            {(() => {
              if (props.length == 0) {
                return <p>Graph is not found</p>;
              }
            })()}
          </p>
          {props.map((e) => (
            <div key={e.id}>
              <Link href={`/graph/singleGraph?id=${e.id}`}>
                <a>
                  <h3 className="graph-index">
                    {e.title}
                    <section>
                      {e.user ? (
                        <span>
                          {/* 表示されない */}
                          by {e.user.email}＞＞＞
                        </span>
                      ) : (
                        <span>Anonymous＞＞＞</span>
                      )}

                      <span>{e.graphKind}</span>
                    </section>
                  </h3>
                </a>
              </Link>
              <br></br>
            </div>
          ))}
          <hr />
          <hr />
        </>
      )}
    </>
  );
};

export default GraphList;
