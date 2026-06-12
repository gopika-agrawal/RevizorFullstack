import React, { useEffect, useState } from 'react';
import UnitChart from './UnitChart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Unit = () => {

    const [unitAnalysis, setUnitAnalysis] = useState([]);
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

                if (data.unitAnalysis) {

                    try {

                        setUnitAnalysis(
                            JSON.parse(
                                data.unitAnalysis
                            )
                        );

                        setLoading(false);

                        clearInterval(interval);

                        clearTimeout(timeout);

                    } catch (error) {

                        console.error(error);

                        toast.error(
                            "Failed to load unit analysis"
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

    if (unitAnalysis.length === 0) {

        return (

            <div className="flex justify-center items-center h-[60vh]">

                <div className="text-center">

                    <h2 className="text-2xl font-bold text-[#07122b]">
                        No Unit Analysis Available
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Please generate insights first.
                    </p>

                </div>

            </div>
        );
    }

    const totalQuestions =
        unitAnalysis.reduce(
            (sum, item) =>
                sum + item.questionCount,
            0
        );

    const mostAsked =
        [...unitAnalysis]
            .sort(
                (a, b) =>
                    b.questionCount -
                    a.questionCount
            )[0];

    const leastAsked =
        [...unitAnalysis]
            .sort(
                (a, b) =>
                    a.questionCount -
                    b.questionCount
            )[0];

    const chartData =
        [...unitAnalysis]
            .sort(
                (a, b) =>
                    b.questionCount -
                    a.questionCount
            );

    return (

        <div className="w-full flex flex-col items-center">

            <h1
                className="
                text-2xl
                sm:text-3xl
                font-bold
                mb-6
                text-[#07122b]
                text-center
                "
            >
                Unit Weightage Analysis
            </h1>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-8
                w-[95%]
                md:w-auto
                "
            >

                <div
                    className="
                    bg-white
                    rounded-2xl
                    p-4
                    sm:p-6
                    shadow
                    "
                >
                    <h3 className="text-gray-600">
                        Total Questions
                    </h3>

                    <p
                        className="
                        text-3xl
                        font-bold
                        text-[#07122b]
                        "
                    >
                        {totalQuestions}
                    </p>
                </div>

                <div
                    className="
                    bg-white
                    rounded-2xl
                    p-4
                    sm:p-6
                    shadow
                    "
                >
                    <h3 className="text-gray-600">
                        Most Important Unit
                    </h3>

                    <p
                        className="
                        text-xl
                        font-bold
                        text-[#07122b]
                        "
                    >
                        {mostAsked?.unit}
                    </p>
                </div>

                <div
                    className="
                    bg-white
                    rounded-2xl
                    p-4
                    sm:p-6
                    shadow
                    "
                >
                    <h3 className="text-gray-600">
                        Least Important Unit
                    </h3>

                    <p
                        className="
                        text-xl
                        font-bold
                        text-[#07122b]
                        "
                    >
                        {leastAsked?.unit}
                    </p>
                </div>

            </div>

            <div
                className="
                w-[95%]
                md:w-[90%]
                max-w-6xl
                "
            >
                <UnitChart
                    unitAnalysis={chartData}
                />
            </div>

        </div>
    );
};

export default Unit;