import React from 'react'
import { Pie } from "react-chartjs-2";
import { dataArray } from './utils/data';

const PieGraph = ({props}) => {
  const propsData = props.data
  const {labelArray, valueArray} = dataArray(propsData)
    const data = {
        labels: labelArray,
        datasets: [{
          label: props.title,
          data: valueArray,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4,
          
        }]
      };
    return (
        <div>
            <Pie type="Pie" data={data} ></Pie>
        </div>
    )
}

export default PieGraph
