import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const UnitChart = ({ unitAnalysis }) => {
  return (
    <div className="w-full h-[450px] bg-white rounded-xl shadow-md p-4">

      <ResponsiveContainer width="100%" height={500}>

        <BarChart
          data={unitAnalysis}
          layout="vertical"
          margin={{
            top: 20,
            right: 40,
            left: 120,
            bottom: 20
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
          />

          <YAxis
            dataKey="unit"
            type="category"
            width={100}
          />

          <Tooltip
            content={<CustomTooltip/>}
          />

          <Bar
            dataKey="questionCount"
            fill="#27c7b8"
            radius={[0, 8, 8, 0]}
          />
          <LabelList
            dataKey="questionCount"
            position="right"
          />
        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default UnitChart;