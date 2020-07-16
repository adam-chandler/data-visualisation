import React from "react";
import { Chart } from "react-google-charts";
const { counter } = require("../utils/counter");

const Barchart = ({ data18, data19, data20 }) => {
  return (
    <Chart
      width={"400px"}
      height={"300px"}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "Age",
          "Unknown",
          "Under 10",
          "10 - 17",
          "18 - 24",
          "25 - 34",
          "over 34",
        ],
        ["2018", ...counter(data18)],
        ["2019", ...counter(data19)],
        ["2020", ...counter(data20)],
      ]}
      options={{
        chart: {
          title: "Stop and search by age",
          subtitle:
            "Stop and search by Age within a one mile radius of NC campus",
        },
      }}
    />
  );
};

export default Barchart;
