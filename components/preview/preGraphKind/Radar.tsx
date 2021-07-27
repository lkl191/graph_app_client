import React from "react";
import { Radar } from "react-chartjs-2";

const PreviewRadar = ({ props, inputData }) => {

  //割合で点数をつける
  const data = {
    labels: inputData.label,
    datasets: [
      {
        data: inputData.value,
        label: props.title,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      }
    ],
  };
  return (
    <div>
      <Radar type="Radar" data={data} />
    </div>
  );
};

export default PreviewRadar;
