import React from "react";
import BasicCard from "../components/common/BasicCard";
import GridWrapper from "../components/common/GridWrapper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Scatter,
} from "recharts";

const data = [
  {
    name: "DateFormat",
    Resistors: 590,
    Capacitors: 300,
    ThresholdCapacitors: 490,
  },
  {
    name: "DateFormat",
    Resistors: 868,
    Capacitors: 967,
    ThresholdCapacitors: 590,
  },
];
const Reports = () => {
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Resistors"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Capacitors" stroke="#82ca9d" />
      </LineChart>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="Capacitors" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Capacitors" barSize={20} fill="#413ea0" />
        <Scatter dataKey="ThresholdCapacitors" fill="red" />
      </ComposedChart>
    </div>
  );
};

export default Reports;
