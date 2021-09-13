import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter, Router } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { MY_GRAPHS } from "../components/graphql/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../context/auth";
import { graphImage } from "../components/allGraph";

const User = () => {
  const [getMine, { data, error }] = useLazyQuery(MY_GRAPHS);
  const [user] = useAuthState(Auth);
  console.log("object");

  //更新で発火
  useEffect(() => {
    if (user) {
      getMine();
    }
  }, [user]);

  if (error) return <p>{error.message} 確認</p>;
  if (data) {
    const props = data.myGraphs;
    return (
      <div className="container">
        <h2>My Graph</h2>
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
                      <br />
                      <span className="graph_desc">
                        {e.user ? <>{e.user.email}</> : <>Anonymous</>}
                      </span>
                    </div>
                  </div>
                </h3>
              </a>
            </Link>
            <br></br>
          </div>
        ))}
        <Link href={`/graph/create-graph`}>
          <a>
            <div className="crt_graph">＋ グラフ作成</div>
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

export default User;
