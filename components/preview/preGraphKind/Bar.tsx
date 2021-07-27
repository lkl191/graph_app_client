import React from "react";
import { Bar } from "react-chartjs-2";

const PreviewBar = ({ props, inputData }) => {
  

  const graphData = {
    // 軸ラベル
    // 各ラベルを配列にすることで軸ラベルが改行されて表示される
    labels: inputData.label,
    datasets: [
      // 表示するデータセット
      {
        data: inputData.value,
        label: props.title,
      },
    ],
  };
  return (
    <div>
      <Bar type="Bar" data={graphData} />
    </div>
  );
};

export default PreviewBar;
