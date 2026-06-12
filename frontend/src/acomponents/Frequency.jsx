import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Frequency = () => {

  const [frequencyData, setFrequencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const userId =
      localStorage.getItem("userId");

    if (!userId) {

      toast.error(
        "Session expired. Please login again."
      );

      navigate("/login");

      return;
    }

    const timeout = setTimeout(() => {

      setLoading(false);

      toast.error(
        "Unable to load insights"
      );

    }, 15000);

    const interval = setInterval(() => {

      const storedData =
        localStorage.getItem("dashboardData");

      if (storedData) {

        const data =
          JSON.parse(storedData);

        if (data.frequencyAnalysis) {

          try {

            setFrequencyData(
              JSON.parse(
                data.frequencyAnalysis
              )
            );

            setLoading(false);

            clearInterval(interval);

            clearTimeout(timeout);

          } catch (error) {

            console.error(error);

            toast.error(
              "Failed to load frequency analysis"
            );

            setLoading(false);

            clearInterval(interval);

            clearTimeout(timeout);
          }
        }
      }

    }, 1000);

    return () => {

      clearInterval(interval);

      clearTimeout(timeout);

    };

  }, [navigate]);

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

  if (loading) {

    return (

      <div className="flex flex-col items-center justify-center h-[70vh]">

        <div
          className="
          w-14
          h-14
          border-4
          border-[#27c7b8]
          border-t-transparent
          rounded-full
          animate-spin
          "
        />

        <p className="mt-4 text-xl font-semibold">
          Generating Frequency Analysis...
        </p>

        <p className="text-gray-500 mt-2">
          Finding most repeated questions
        </p>

      </div>
    );
  }

  if (frequencyData.length === 0) {

    return (

      <div className="flex justify-center items-center h-[60vh]">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-[#07122b]">
            No Frequency Data Available
          </h2>

          <p className="text-gray-500 mt-2">
            Please generate insights first.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-10">

      <h1
        className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        font-black
        text-[#07122b]
        text-center
        mb-10
        "
      >
        Frequency Analysis
      </h1>

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg border">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

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
                  className="
                  border-b
                  hover:bg-slate-50
                  transition
                  "
                >

                  <td
                    title={item.question}
                    className="
                    px-6
                    py-5
                    font-medium
                    text-[#07122b]
                    "
                  >
                    {item.question}
                  </td>

                  <td
                    className="
                    text-center
                    px-6
                    py-5
                    font-semibold
                    "
                  >
                    {item.frequency}
                  </td>

                  <td
                    className="
                    text-center
                    px-6
                    py-5
                    "
                  >
                    {item.years.join(", ")}
                  </td>

                  <td
                    className="
                    text-center
                    px-6
                    py-5
                    "
                  >

                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${getBadgeColor(item.importance)}
                      `}
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

    </div>
  );
};

export default Frequency;