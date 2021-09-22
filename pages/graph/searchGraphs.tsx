import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SEARCH_GRAPHS } from "../../components/graphql/query";
import { graphImage } from "../../components/allGraph";

const SearchGraphs = () => {
  const [searchWord, setSearchWord] = useState("");
  const [getGraph, { data }] = useLazyQuery(SEARCH_GRAPHS);

  const router = useRouter();
  const word = router.query.word;
  //console.log(word)

  useEffect(() => {
    getGraph({
      variables: { searchWord: word },
    });
  }, [word]);

  let props;
  if (data) {
    props = data.searchGraphs;
  }
  console.log(props);

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
      {props && (
        <>
          <br />"{word}"の検索結果 {props.length}件
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
                      </div>
                    </div>
                  </h3>
                </a>
              </Link>
              <br></br>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchGraphs;
