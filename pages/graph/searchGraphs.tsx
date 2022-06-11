import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SEARCH_GRAPHS } from "../../components/graphql/query";
import GraphHeadline from "../../components/graph/GraphHeadline";
import { useQueryParams } from "../../hooks/useQueryParams";
import { Graph } from "../../types/types";

const SearchGraphs = () => {
  const [searchWord, setSearchWord] = useState("");
  const [getGraph, { data, error, loading }] = useLazyQuery<{ searchGraphs: Graph[] }>(SEARCH_GRAPHS);

  const word = useQueryParams("word")

  useEffect(() => {
    getGraph({
      variables: { searchWord: word },
    });
  }, [word]);
  if (error) return <div className="container">error</div>
  if (loading) return <div className="container">Loading...</div>

  if (data) {
    const graphs = data.searchGraphs;
    return (
      <div className="container">
        <input
          type="text"
          className="input_text search_input"
          placeholder="Search Graph"
          onChange={(e) => setSearchWord(e.target.value)}
        />

        <Link href={`/graph/searchGraphs?word=${searchWord}`}>
          <button className="button">検索</button>
        </Link>
        <p>{`"`}{word}{`"`}の検索結果 {graphs.length}件</p>
        <GraphHeadline graphs={graphs} />
      </div>
    );
  } else {
    return null
  }

};

export default SearchGraphs;
