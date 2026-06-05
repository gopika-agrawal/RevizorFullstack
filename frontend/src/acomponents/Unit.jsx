import React, { useEffect, useState } from 'react'
import UnitChart from './UnitChart';

const Unit = () => {

    const [ unitAnalysis, setUnitAnalysis ] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("dashboardData"));

        setUnitAnalysis(JSON.parse(data.unitAnalysis));
    },[])


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