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
import { DeleteGraphProps } from "../../components/deleteGraph";
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
    return (
      <div>
        <br></br>
        <h1 className="graph-single">{props.title}</h1>
        <p>{props.id}</p>
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
        <DataSheet props={props} />
        <div>
          {props.source ? (
            <p>
              source URL
              <br />
              <a href={`${props.source}`} target="blank">
                <span className="href">{props.source}</span>
              </a>
            </p>
          ) : (
            <p>source URL not found</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
};

const HostContent = () => {
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
    return (
      <div>
        <br></br>
        <h1 className="graph-single">{props.title}</h1>
        <p>{props.id}</p>
        <DeleteModal />

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
        <DataSheet props={props} />
        <div>
          {props.source ? (
            <p>
              <a href={`${props.source}`} target="blank">
                <span className="href">source URL</span>
              </a>
              <span className="right">
                <button className="button change_btn">変更</button>
              </span>
            </p>
          ) : (
            <p>source URL not found</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
};

const singleGraph = () => {
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
  }
  return (
    <div>
      <div className="container">
        {userExact ? <HostContent /> : <Content />}
      </div>
    </div>
  );
};

export default singleGraph;
