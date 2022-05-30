import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import Image from "next/image";

import { ALL_GRAPHS } from "../graphql/query";
import { graphImage } from "./showGraphs";
import { Graph } from "../../types/types";

const GraphList = () => {
  const { error, loading, data } = useQuery<{ allGraphs: Graph[] }>(ALL_GRAPHS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error... {error.message}</p>;

  const graphs = data.allGraphs;
  console.log(data)
  return (
    <div className="all_graph">
      <h1 className="other-title">Graph一覧</h1>
      <GraphSort />
      <p>グラフ数 {graphs.length}</p>
      <AllGraph graphs={graphs} />
    </div>
  );
};

const AllGraph = ({ graphs }: { graphs: Graph[] }) => {
  return (
    <div>
      <>
        {graphs.map((e) => (
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
                      {e.description && (
                        <p className="description_allGraph">{e.description}</p>
                      )}
                    </div>
                  </div>
                </h3>
              </a>
            </Link>
            <br />
          </div>
        ))}
      </>
    </div>
  );
};

const GraphSort = () => {
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
        <button className="button">検索</button>
      </Link>
    </>
  );
};

export default GraphList;
