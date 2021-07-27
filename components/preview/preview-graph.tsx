import React from "react";
import PreviewBar from "./preGraphKind/Bar";
import PreviewLine from "./preGraphKind/Line";
import PreviewPie from "./preGraphKind/Pie";
import PreviewRadar from "./preGraphKind/Radar";
import PreviewScatter from "./preGraphKind/Scatter";

const PreviewGraph = ({ props, inputData }) => {
  const kind = props.graphKind;

  return (
    <div>
      {(() => {
        if (kind == "BAR") {
          return <PreviewBar props={props} inputData={inputData} />;
        } else if (kind == "LINE") {
          return <PreviewLine props={props} inputData={inputData} />;
        } else if (kind == "PIE") {
          return <PreviewPie props={props} inputData={inputData} />;
        } else if (kind == "RADAR") {
          return <PreviewRadar props={props} inputData={inputData} />;
        } else if (kind == "SCATTER") {
          return <PreviewScatter props={props} inputData={inputData} />;
        }
      })()}
    </div>
  );
};

export default PreviewGraph;
