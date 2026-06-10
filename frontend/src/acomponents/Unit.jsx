import React, { useEffect, useState } from 'react'
import UnitChart from './UnitChart';

const Unit = () => {

    const [ unitAnalysis, setUnitAnalysis ] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {

            const storedData =
                localStorage.getItem("dashboardData");

            if (storedData) {

                const data =
                    JSON.parse(storedData);

                if (data.unitAnalysis) {

                    setUnitAnalysis(
                        JSON.parse(
                            data.unitAnalysis
                        )
                    );

                    setLoading(false);

                    clearInterval(interval);
                }
            }

        }, 1000);

        return () => clearInterval(interval);

    }, []);

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

                    Generating Insights...

                </p>

                <p className="text-gray-500 mt-2">

                    Analyzing previous year papers

                </p>

            </div>
        );
    }


    const totalQuestions = unitAnalysis.reduce((sum, item) => sum + item.questionCount,0);

    const mostAsked = [...unitAnalysis].sort((a, b) => b.questionCount - a.questionCount)[0];

    const leastAsked = [...unitAnalysis].sort((a, b) => a.questionCount - b.questionCount)[0];

    const chartData = [...unitAnalysis].sort((a, b) => b.questionCount - a.questionCount);

  return (
    <div className="w-full flex flex-col items-center">

    <h1 className="text-3xl font-bold mb-6 text-[#07122b]">
      Unit Weightage Analysis
    </h1>

    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-2xl p-6 shadow">
        <h3>Total Questions</h3>
        <p className="text-3xl font-bold">
          {totalQuestions}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h3>Most Important Unit</h3>
        <p className="text-xl font-bold">
          {mostAsked?.unit}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h3>Least Important Unit</h3>
        <p className="text-xl font-bold">
          {leastAsked?.unit}
        </p>
      </div>

    </div>

    <div className="w-[90%] max-w-6xl">

      <UnitChart unitAnalysis={chartData} />

    </div>

  </div>
  )
}

export default Unit