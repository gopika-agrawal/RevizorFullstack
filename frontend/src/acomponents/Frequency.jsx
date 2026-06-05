import React, { useEffect, useState } from "react";

const Frequency = () => {

  const [frequencyData, setFrequencyData] = useState([]);

  useEffect(() => {

    const dashboardData = JSON.parse(
      localStorage.getItem("dashboardData")
    );

    if (!dashboardData) return;

    setFrequencyData(
      JSON.parse(dashboardData.frequencyAnalysis)
    );

  }, []);

  const getBadgeColor = (importance) => {

    switch (importance) {

      case "HIGH":
        return "bg-red-100 text-red-600";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (

    <div className="w-full max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-black text-[#07122b] text-center mb-10">
        Frequency Analysis
      </h1>

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg border">

        <table className="w-full">

          <thead>

            <tr className="bg-[#27c7b8] text-white">

              <th className="text-left px-6 py-4">
                Question
              </th>

              <th className="text-center px-6 py-4">
                Frequency
              </th>

              <th className="text-center px-6 py-4">
                Years
              </th>

              <th className="text-center px-6 py-4">
                Importance
              </th>

            </tr>

          </thead>

          <tbody>

            {frequencyData.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5 font-medium text-[#07122b]">
                  {item.question}
                </td>

                <td className="text-center px-6 py-5 font-semibold">
                  {item.frequency}
                </td>

                <td className="text-center px-6 py-5">
                  {item.years.join(", ")}
                </td>

                <td className="text-center px-6 py-5">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getBadgeColor(item.importance)}`}
                  >
                    {item.importance}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default Frequency;