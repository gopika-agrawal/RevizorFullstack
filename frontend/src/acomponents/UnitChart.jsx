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

  if (!unitAnalysis?.length) {
    return null;
  }

  const isMobile = window.innerWidth < 640;

  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[450px] bg-white rounded-xl shadow-md p-2 sm:p-4">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          data={unitAnalysis}
          layout="vertical"
          margin={{
            top: 20,
            right: 20,
            left: isMobile ? 10 : 80,
            bottom: 20
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            dataKey="unit"
            type="category"
            width={isMobile ? 55 : 140}
            tick={{ fontSize: isMobile ? 12 : 14 }}
          />

          <Tooltip
            cursor={{ fill: "#f8fffe" }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="questionCount"
            fill="#27c7b8"
            radius={[0, 8, 8, 0]}
          >
            <LabelList
              dataKey="questionCount"
              position="right"
              fontSize={isMobile ? 10 : 12}
            />
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default UnitChart;