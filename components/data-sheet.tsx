import React from "react";
import ReactDataSheet from "react-datasheet";

import { putValue } from "./utils/data";
import "react-datasheet/lib/react-datasheet.css";
import { Graph } from "../types/types";

const DataSheet = ({ graph }: {graph: Graph}) => {
  const propsData = graph.data;
  const { labelArray, valueArray } = putValue(propsData);

  const data = [labelArray, valueArray];
  return (
    <div
      style={{
        margin: "50px auto",
        maxWidth: "800px",
      }}
    >
      <ReactDataSheet 
      data={data}
      valueRenderer={(cell) => cell.value}
      className="sheet-container "
      />
    </div>
  );
};

export default DataSheet;