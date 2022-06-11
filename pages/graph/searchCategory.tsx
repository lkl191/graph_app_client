import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GRAPH_CATEGORY } from "../../components/graphql/query";
import GraphHeadline from "../../components/graph/GraphHeadline";
import { useQueryParams } from "../../hooks/useQueryParams";
import { Graph } from "../../types/types";

const SearchCate = () => {
  const [getGraph, { data, error, loading }] = useLazyQuery<{ graphCate: Graph[] }>(GRAPH_CATEGORY);

  const category = useQueryParams("category")

  useEffect(() => {
    if (category) {
      getGraph({
        variables: { category: category },
      });
    }
  }, [category]);

  if (error) return <div className="container">Error</div>
  if (loading) return <div className="container">Loading...</div>

  if (data) {
    const graphs = data.graphCate;
    return (
      <div className="container">
        <p>
          {`"`}{category}{`"`}の検索結果 {graphs.length}件
        </p>
        <GraphHeadline graphs={graphs} />
      </div>
    );
  } else {
    return null
  }
};

export default SearchCate;
