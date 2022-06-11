import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import Image from "next/image";

import { ALL_GRAPHS } from "../graphql/query";
import GraphHeadline, { graphImage } from "./GraphHeadline";
import { Graph } from "../../types/types";

const GraphList = () => {
  const { error, loading, data } = useQuery<{ allGraphs: Graph[] }>(ALL_GRAPHS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error... {error.message}</p>;

  const graphs = data.allGraphs;
  return (
    <div className="all_graph">
      <h1 className="other-title">Graph一覧</h1>
      <GraphSort />
      <p>グラフ数 {graphs.length}</p>
      <GraphHeadline graphs={graphs} />
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
