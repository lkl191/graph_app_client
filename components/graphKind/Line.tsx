import React from "react";
import { Line } from "react-chartjs-2";
import { dataArray } from "./utils/data";

const LineGraph = ({ props }) => {
  if (props.data != null) {
    const propsData = props.data;
    const color = props.color || "75,192,192"
    const { labelArray, valueArray } = dataArray(propsData);

    const graphData = {
      labels: labelArray,
      datasets: [
        {
          data: valueArray,
          label: `${props.title}`,
          backgroundColor: `rgba(${color},0.4)`,
          /*
          fill: true,
          lineTension: 0.1,
          borderColor: `rgba(${color},1)`,
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "square",
          pointBorderColor: `rgba(${color},1)`,
          pointBackgroundColor: "#eee",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: `rgba(${color},1)`,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          */
        },
      ],
    };
    return (
      <div>
        <Line data={graphData} />
      </div>
    );
  } else {
    return null;
  }
};

export default LineGraph;
