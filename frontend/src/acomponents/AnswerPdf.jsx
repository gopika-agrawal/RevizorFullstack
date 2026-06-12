import React, { useState } from "react";

const AnswerPdf = () => {

  const [loading, setLoading] = useState(false);

  const generatePdf = async () => {

    try {

      setLoading(true);

      const dashboardData =
        JSON.parse(localStorage.getItem("dashboardData"));

      const frequencyData =
        dashboardData.frequencyAnalysis;

      const university =
        localStorage.getItem("university");

      const response = await fetch(
        "http://localhost:8080/api/answer/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            university,
            frequencyJson: JSON.stringify(
              frequencyData
            )
          })
        }
      );

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download = "RevizorAnswers.pdf";

      a.click();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="w-full flex justify-center items-center py-12">

      <div
        className="
        w-[90%]
        max-w-3xl
        bg-white
        rounded-3xl
        shadow-lg
        p-10
        text-center
        "
      >

        <h1
          className="
          text-4xl
          font-black
          text-[#07122b]
          mb-4
          "
        >
          Generate Answer PDF
        </h1>

        <p
          className="
          text-[#5f6c8d]
          text-lg
          mb-10
          "
        >
          Generate a complete exam-oriented PDF
          containing important answers,
          frequently asked questions,
          and university-specific content.
        </p>

        <button
          onClick={generatePdf}
          disabled={loading}
          className="
          bg-[#27c7b8]
          text-white
          px-8
          py-4
          rounded-2xl
          font-semibold
          text-lg
          hover:scale-105
          hover:shadow-[0_0_30px_rgba(39,199,184,0.35)]
          transition-all
          disabled:opacity-60
          disabled:cursor-not-allowed
          "
        >

          {loading ? (

            <div className="flex items-center gap-3">

              <div
                className="
                w-5
                h-5
                border-2
                border-white
                border-t-transparent
                rounded-full
                animate-spin
                "
              />

              <span>
                Generating PDF...
              </span>

            </div>

          ) : (

            "Download Answer PDF"

          )}

        </button>

      </div>

    </div>
  );
};

export default AnswerPdf;