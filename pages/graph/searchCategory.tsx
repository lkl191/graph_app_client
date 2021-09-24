import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GRAPH_CATEGORY } from "../../components/graphql/query";
import { graphImage } from "../../components/allGraph";

const SearchCate = () => {
  //const [searchCategory, setSearchCategory] = useState("")

  const [getGraph, { data }] = useLazyQuery(GRAPH_CATEGORY);

  const router = useRouter();
  const category = router.query.category;

  useEffect(() => {
    if (category) {
      getGraph({
        variables: { category: category },
      });
    }
  }, [category]);

  console.log(data);
  if (data) {
    const props = data.graphCate;
    return (
      <div className="container">
          <p>"{category}"の検索結果</p>
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
      </div>
    );
  }
  return <div className="container">category</div>;
};

export default SearchCate;
