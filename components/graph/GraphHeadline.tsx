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
        <Link href={`/graph/singleGraph?id=${e.id}`} className="">
          <div key={e.id} className="graph-card">
            <h3>{e.title}</h3>
            <p className="graph-description">{e.description}</p>
            <Image
              src={graphImage(e.graphKind)}
              width="75"
              height="75"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GraphHeadline;
