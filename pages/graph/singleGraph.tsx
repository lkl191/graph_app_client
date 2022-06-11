import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";

import { SINGLE_GRAPH } from "../../components/graphql/query";
import GraphTemplate from "../../components/graph/GraphTemplate";
import DataSheet from "../../components/data-sheet";
import { DeleteGraphProps } from "../../components/graph/deleteGraph";
import { AuthContext } from "../../context/auth";
import { Graph, GraphKind } from "../../types/types";
import { useQueryParams } from "../../hooks/useQueryParams";

const DeleteModal = () => {
  const router = useRouter();
  const id = router.query.id;
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow((props) => !props);
  };
  return (
    <span>
      <button className="button delete_button" onClick={openModal}>
        削除
      </button>
      <DeleteGraphProps id={id} show={show} setShow={setShow} />
    </span>
  );
};

const SingleGraph = () => {
  const [isHost, setIsHost] = useState(false)
  const { user } = useContext(AuthContext)

  const id = useQueryParams("id")
  const [getGraph, { error, data }] = useLazyQuery<{ singleGraph: Graph }>(SINGLE_GRAPH, {
    variables: { id },
  });

  useEffect(() => {
    if (id) {
      getGraph();
    }
  }, [id]);
  if (error) return <p>error... {error.message}</p>;

  if (data) {
    const graph = data.singleGraph;
    if (!isHost && user && graph.user && user.uid === graph.user._id) {
      setIsHost(true)
    }
    return (
      <div>
        <div className="container">
          <br></br>
          <h1 className="graph-single">{graph.title}</h1>
          <div>
            {isHost && <DeleteModal />}
            <GraphTemplate graph={graph} />
            <DataSheet graph={graph} />
          </div>
          <div className="graph_info">
            {graph.category && (
              <Link href={`/graph/searchCategory?category=${graph.category}`}>
                <a className="button">{graph.category}</a>
              </Link>
            )}
            {graph.description ? <p>{graph.description}</p> : <p></p>}
            {graph.source ? (
              <p>
                <a href={`${graph.source}`} target="blank">
                  <span className="href">source URL</span>
                </a>
              </p>
            ) : (
              <p>source URL not found</p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="container">Loading...</div>;
  }
};

export default SingleGraph;
