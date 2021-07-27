import React from "react";
import { Pie } from "react-chartjs-2";

const PreviewPie = ({ props, inputData }) => {
  console.log(inputData)
  const data = {
    labels: inputData.label,
    datasets: [
      {
        label: props.title,
        data: inputData.value,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <Pie type="Pie" data={data}></Pie>
    </div>
  );
};

export default PreviewPie;
