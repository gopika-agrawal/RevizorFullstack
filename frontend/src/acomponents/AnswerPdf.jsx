import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnswerPdf = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generatePdf = async () => {

    try {

      setLoading(true);

      const userId = localStorage.getItem("userId");

      if(!userId){
        toast.error("Session Expired. Please login again.");
        navigate("/login");
        return;
      }

      const dashboardData =
        JSON.parse(localStorage.getItem("dashboardData"));

      if(!dashboardData?.frequencyAnalysis){
        toast.error("Please generate insights first");
        return;
      }

      const frequencyData =
        dashboardData.frequencyAnalysis;

      if(!frequencyData){
        toast.error("Frequency analysis not found");
        return;
      }

      const university = localStorage.getItem("university");

      const subject = localStorage.getItem("subject");

      if(!university){
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if(!subject){
        toast.error("Please enter subject name");
        return;
      }

      console.log(typeof frequencyData);
      console.log(frequencyData);

      const response = await fetch(
        "http://localhost:8080/api/answer/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            university,
            subject,
            frequencyJson: JSON.stringify(
              frequencyData
            )
          })
        }
      );

      if(!response.ok){
        toast.error("Failed to generate PDF");
        return;
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download = "RevizorAnswers.pdf";

      
      a.click();

      toast.success("PDF downloaded successfully check your folder");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      },1000);

    } catch (error) {

      console.error(error);

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="w-full flex justify-center items-center py-12">

      <div
        className="
        w-[95%]
        sm:w-[90%]
        max-w-3xl
        bg-white
        rounded-3xl
        shadow-lg
        p-4
        sm:p-6
        md:p-10
        text-center
        "
      >

        <h1
          className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-black
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