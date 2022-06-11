import { useQuery } from "@apollo/client";
import Link from "next/link";
import { BlendGraph, Graph } from "../../types/types";
import { ALL_BLEND_GRAPH } from "../graphql/query";

const AllBlendGraph = () => {
  const { data, loading, error } = useQuery<{ allBlendGraphs: BlendGraph[] }>(ALL_BLEND_GRAPH);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error... {error.message}</p>;

  const blendGraphs = data.allBlendGraphs;

  return (
    <div className="all_graph">
      <h1 className="other-title">
        複合グラフ一覧
        <p>グラフ数 {blendGraphs.length}</p>
        <div>
          {blendGraphs.map((e) => (
            <div key={e.id}>
              <Link href={`/graph/singleBlendGraph?id=${e.id}`}>
                <a>
                  <h3 className="graph-index">
                    <div>
                      <span className="graph_title">{e.title}</span>
                    </div>
                  </h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </h1>
    </div>
  );
};

export default AllBlendGraph;
