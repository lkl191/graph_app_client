import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLazyQuery, useQuery } from "@apollo/client";
import Image from "next/image";

import { ALL_GRAPHS, SEARCH_GRAPHS, GRAPH_CATEGORY } from "./graphql/query";

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

export const graphImage = (graphKind) => {
  let imagePath;
  switch (graphKind) {
    case "BAR":
      imagePath = "/Graphs/bar.png";
      break;
    case "LINE":
      imagePath = "/Graphs/line.png";
      break;
    case "PIE":
      imagePath = "/Graphs/circle.png";
      break;
    case "RADAR":
      imagePath = "/Graphs/radar.png";
      break;
  }
  return imagePath;
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
                  <div className="flex">
                    <div className="graph_image">
                      <Image
                        src={graphImage(e.graphKind)}
                        width="75"
                        height="75"
                      />
                    </div>
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
      </>
    </div>
  );
};

const GraphSort = () => {
  //let category;
  const [searchWord, setSearchWord] = useState("");
  return (
    <>
      <input
        type="text"
        className="input_text search_input"
        placeholder="Search Graph"
        onChange={(e) => setSearchWord(e.target.value)}
      />
        <Link href={`/graph/searchGraphs?word=${searchWord}`}>
          <button className="button">
          検索
          </button>
        </Link>
    </>
  );
};

export default GraphList;
