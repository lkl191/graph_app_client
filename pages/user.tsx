import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter, Router } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MY_GRAPHS } from "../components/graphql/query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../context/auth";

const User = () => {
  const [getMine, { data, error }] = useLazyQuery(MY_GRAPHS);
  const [user] = useAuthState(Auth);

  //更新で発火
  useEffect(() => {
    if(user){
      getMine()
    }
  }, [user]);

  if (error) return <p>{error.message} 確認</p>;
  if (data) {
    const props = data.myGraphs;
    return (
      <div className="container">
        <h1>My Graph</h1>
        {props.map((e) => (
          <div key={e.id}>
            <Link href={`/graph/singleGraph?id=${e.id}`}>
              <a>
                <h3 className="graph-index">
                  {e.title}
                  <section>
                    {e.user ? (
                      <span>by {e.user.email}</span>
                    ) : (
                      <span>Anonymous＞＞＞</span>
                    )}
                    <span>{e.graphKind}</span>
                  </section>
                </h3>
              </a>
            </Link>
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
};

export default User;
