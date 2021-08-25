import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

import { SINGLE_GRAPH } from "../../components/graphql/query";
import BarGraph from "../../components/graphKind/Bar";
import LineGraph from "../../components/graphKind/Line";
import PieGraph from "../../components/graphKind/Pie";
import RadarGraph from "../../components/graphKind/Radar";
import ScatterGraph from "../../components/graphKind/Scatter";
import DataSheet from "../../components/data-sheet";
import DeleteGraphProps from "../../components/deleteGraph";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../../context/auth";

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

const Content = () => {
  let userExact = false;
  const [user] = useAuthState(Auth);

  const router = useRouter();
  const id = router.query.id;
  let props, kind;
  const [getGraph, { error, data }] = useLazyQuery(SINGLE_GRAPH, {
    variables: { id },
  });
  if (error) return <p>error... {error.message}</p>;

  useEffect(() => {
    if (id) {
      getGraph();
    }
  }, [id]);

  if (data) {
    props = data.singleGraph;
    kind = props.graphKind;
    if (user && props.user) {
      if (user.uid == props.user._id) {
        userExact = true;
      }
    }
    return (
      <div>
        <br></br>
        <h1 className="graph-single">{props.title}</h1>
        {/*
        <Link href={`/`}>
          <a className="button category">{props.category}</a>
        </Link>
         */}
        {userExact && <DeleteModal />}

          {(() => {
            if (kind == "BAR") {
              return <BarGraph props={props} />;
            } else if (kind == "LINE") {
              return <LineGraph props={props} />;
            } else if (kind == "PIE") {
              return <PieGraph props={props} />;
            } else if (kind == "RADAR") {
              return <RadarGraph props={props} />;
            } else if (kind == "SCATTER") {
              return <ScatterGraph props={props} />;
            }
          })()}
          {/* 
        <button
          className="button"
          onClick={() => {
            downloadImg();
          }}
          id="download"
        >
          保存
        </button>
         */}
        <DataSheet props={props} />
      </div>
    );
  } else {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }
};

const singleGraph = () => {
  return (
    <div>
      <div className="container">
        <Content />
      </div>
    </div>
  );
};

export default singleGraph;