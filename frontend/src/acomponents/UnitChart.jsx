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

  if(!unitAnalysis?.length){
    return null;
  }

  return (
    <div className="w-full h-[500px] md:h-[450px] bg-white rounded-xl shadow-md p-4">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          data={unitAnalysis}
          layout="vertical"
          margin={{
            top: 20,
            right: 20,
            left: 80,
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
            width={140}
          />

          <Tooltip
            cursor={{fill: "#f8fffe"}}
            content={<CustomTooltip/>}
          />

          <Bar
            dataKey="questionCount"
            fill="#27c7b8"
            radius={[0, 8, 8, 0]}
          >
            <LabelList
              dataKey="questionCount"
              position="right"
              fontSize={12}
            />
          </Bar>
        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default UnitChart;