import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Graph, GraphKind } from "../../types/types";

export const graphImage = (graphKind: GraphKind) => {
  let imagePath: string;
  switch (graphKind) {
    case "BAR":
      imagePath = "/Graphs/bar.png";
      break;
    case "LINE":
      imagePath = "/Graphs/line.png";
      break;
    case "PIE":
      imagePath = "/Graphs/circle.png";
      break;
    case "RADAR":
      imagePath = "/Graphs/radar.png";
      break;
  }
  return imagePath;
};

const GraphHeadline = ({ graphs }: { graphs: Graph[] }) => {
  return (
    <div className="graph-card-wrapper">
      {graphs.map((e) => (
        <div key={e.id} className="graph-card">
          <Link href={`/graph/singleGraph?id=${e.id}`}>
            <p>{e.title}</p>
            <Image
              src={graphImage(e.graphKind)}
              width="75"
              height="75"
            />
          </Link>
          {/* <Link href={`/graph/singleGraph?id=${e.id}`}>
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
                    {e.description && (
                      <p className="description_allGraph">{e.description}</p>
                    )}
                  </div>
                </div>
              </h3>
            </a>
          </Link>
          <br /> */}
        </div>
      ))}
    </div>
  );
};

export default GraphHeadline;
