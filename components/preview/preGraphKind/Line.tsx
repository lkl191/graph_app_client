import React from "react";
import { Line } from "react-chartjs-2";

const PreviewLine = ({ props, inputData }) => {

  const example = {
    labels: inputData.label,
    datasets: [
      {
        label: `${props.title}`,
        data: inputData.value,
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "square",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#eee",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };
  return (
    <div>
      <Line type="Line" data={example} />
    </div>
  );
};

export default PreviewLine;
