import React from 'react'

const AnswerPdf = () => {

  const generatePdf = async() => {

    const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

    const frequencyData = dashboardData.frequencyAnalysis;

    const university = localStorage.getItem("university");

    const response = await fetch("http://localhost:8080/api/answer/pdf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          university,
          frequencyJson: JSON.stringify(frequencyData)
        })
      }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "RevizorAnswers.pdf";

    a.click();

  };

  return (

    <div>

      <button onClick={generatePdf}>
        Generate Answer PDF
      </button>

    </div>

  );
};

export default AnswerPdf