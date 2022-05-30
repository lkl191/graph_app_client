import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CreateGraphType, Graph } from "../../types/types";
import { dataArray } from "../utils/data";

const GraphTemplate = ({ graph }: { graph: Graph }) => {
  const propsData = graph.data;
  const color = graph.color || "75,192,192";

  // const chartRef = useRef(null);
  //const base64Image = chartRef.current.chartInstance.toBase64Image();

  //label, valueの配列を取得
  const { labelArray, valueArray } = dataArray(propsData);

  let data;
  if (graph.graphKind == "BAR" || graph.graphKind == "LINE") {
    data = {
      // 軸ラベル
      // 各ラベルを配列にすることで軸ラベルが改行されて表示される
      labels: labelArray,
      datasets: [
        // 表示するデータセット
        {
          label: graph.title,
          data: valueArray,
          backgroundColor: `rgba(${color}, 0.4)`,
        },
      ],
    };
  } else if (graph.graphKind == "PIE") {
    data = {
      labels: labelArray,
      datasets: [{
        label: graph.title,
        data: valueArray,
        backgroundColor: color,
        hoverOffset: 4,

      }]
    };
  }

  return (
    <div>
      {(() => {
        switch (graph.graphKind) {
          case "BAR":
            return <Bar data={data} />
          case "LINE":
            return <Line data={data} />
          case "PIE":
            return <Pie data={data} />
          case "RADAR":
            return
        }
      })()}
    </div>
  );
};

export default GraphTemplate;
