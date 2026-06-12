import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImage from '../assets/landingImage.png'

import {
  Bot,
  Brain,
  ChartNetwork,
  ChartNoAxesCombined,
  FileText,
  ScanText,
  ArrowRight
} from 'lucide-react'

import testi1 from '../assets/testi1.png'
import testi2 from '../assets/testi2.png'
import testi3 from '../assets/testi3.png'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'

const LandingPage = () => {

  const navigate = useNavigate();

  const handleGetStarted = () => {

      const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    const hasVisited =
        localStorage.getItem("hasVisited") === "true";

    if (isLoggedIn) {

        navigate("/home");

        return;
    }

    if (hasVisited) {

        navigate("/login");

        return;
    }

    navigate("/signup");
  
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7fbfa] text-[#07122b]">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfeceb_1px,transparent_1px),linear-gradient(to_bottom,#dfeceb_1px,transparent_1px)] bg-[size:60px_60px] opacity-60"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-24 pb-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            <div className="space-y-6">

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] tracking-[-3px] text-[#07122b]">
                Upload Previous
                <br />
                Year Papers.
                <br />
                <span className="text-[#27c7b8]">
                  Get Important
                </span>
                <br />
                Questions Instantly.
              </h1>

              <div className="w-32 h-1.5 rounded-full bg-[#27c7b8]"></div>

              <p className="text-base sm:text-lg md:text-xl text-[#5f6c8d] max-w-xl font-medium">
                Analyze repeated questions, unit weightage,
                derivations, and generate exam-focused revision
                notes automatically.
              </p>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-5">

              <Link to={"/home"}>
                <Button onClick={handleGetStarted} className="bg-[#07122b] hover:bg-[#0b1735] text-white rounded-full h-14 px-10 text-lg shadow-xl">
                  Get Started
                </Button>
              </Link>

              <Link to={"/"}>
                <Button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({
                        behavior: "smooth"
                      })
                  }
                  variant="outline"
                  className="border-[#dfeceb] bg-white/70 backdrop-blur-md hover:bg-white rounded-full h-14 px-10 text-lg text-[#07122b]"
                >
                  View Demo
                </Button>
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* GLOW EFFECT */}
            <div className="absolute -top-10 -right-10 w-[450px] h-[450px] bg-[#8ef3e8] blur-[120px] opacity-40 rounded-full"></div>

            <img
              src={landingImage}
              alt='landingImage'
              className="relative z-10 w-full drop-shadow-2xl"
            />

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black tracking-[-2px] text-[#07122b]">
            How it Works
          </h2>

          <p className="text-[#5f6c8d] text-lg mt-5">
            Smart AI workflow for exam preparation
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <div className="w-16 h-16 rounded-2xl bg-[#e9fbf8] flex items-center justify-center mb-6">
              <FileText className="text-[#27c7b8] w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold mb-4">
              Upload PDFs
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              Upload previous year papers and notes.
            </p>

          </div>

          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <div className="w-16 h-16 rounded-2xl bg-[#e9fbf8] flex items-center justify-center mb-6">
              <Bot className="text-[#27c7b8] w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold mb-4">
              AI Analyzes Papers
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              System detects repeated topics and unit trends.
            </p>

          </div>

          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <div className="w-16 h-16 rounded-2xl bg-[#e9fbf8] flex items-center justify-center mb-6">
              <Brain className="text-[#27c7b8] w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold mb-4">
              Get Exam Insights
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              Receive important questions, analytics, and revision notes.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black tracking-[-2px] text-[#07122b]">
            Powerful Features
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <ChartNetwork className="w-12 h-12 text-[#27c7b8] mb-6" />

            <h1 className="text-2xl font-bold mb-4">
              Unit Weightage Heatmap
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              Shows which units are most important based on previous year papers.
            </p>

          </div>

          {/* FEATURE CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <ChartNoAxesCombined className="w-12 h-12 text-[#27c7b8] mb-6" />

            <h1 className="text-2xl font-bold mb-4">
              Repeated Question Analytics
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              Detects frequently asked questions and recurring concepts.
            </p>

          </div>

          {/* FEATURE CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <ScanText className="w-12 h-12 text-[#27c7b8] mb-6" />

            <h1 className="text-2xl font-bold mb-4">
              Sem-Exam Style Answers
            </h1>

            <p className="text-[#5f6c8d] leading-8">
              Generates concise university-style answers with diagrams and flowcharts.
            </p>

          </div>

        </div>

      </section>


      {/* TESTIMONIALS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black tracking-[-2px] text-[#07122b]">
            What Students Say
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* TESTIMONIAL */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <img
              src={testi1}
              alt="testi1"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-6"
            />

            <p className="text-[#5f6c8d] leading-8 text-lg">
              "Saved hours before exams by identifying the most repeated questions instantly."
            </p>

          </div>

          {/* TESTIMONIAL */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <img
              src={testi2}
              alt="testi2"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-6"
            />

            <p className="text-[#5f6c8d] leading-8 text-lg">
              "The revision notes were more useful than manually making notes from multiple papers."
            </p>

          </div>

          {/* TESTIMONIAL */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_60px_rgba(39,199,184,0.30)]">

            <img
              src={testi3}
              alt="testi3"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-6"
            />

            <p className="text-[#5f6c8d] leading-8 text-lg">
              "The heatmap made it easy to focus only on important units."
            </p>

          </div>

        </div>

      </section>


      {/* FAQS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 py-20">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black tracking-[-2px] text-[#07122b]">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-[28px] p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

          <Accordion type="single" collapsible>

            <AccordionItem value="accurate">
              <AccordionTrigger>
                How accurate are repeated question predictions?
              </AccordionTrigger>

              <AccordionContent>
                AI analyzes patterns from previous year papers to identify important recurring questions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="university">
              <AccordionTrigger>
                Which universities are supported?
              </AccordionTrigger>

              <AccordionContent>
                The platform supports multiple university paper formats and structures.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="scanned">
              <AccordionTrigger>
                Does it work with scanned PDFs?
              </AccordionTrigger>

              <AccordionContent>
                Yes, OCR-based extraction helps process scanned documents as well.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </div>

      </section>


      {/* CTA SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-24">

        <div className="bg-[#07122b] rounded-[40px] px-10 py-20 text-center relative overflow-hidden">

          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#27c7b8] opacity-20 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Stop Wasting Hours
              <br />
              Analyzing Papers Manually.
            </h2>

            <p className="text-[#b9c3d4] text-xl mt-6 max-w-3xl mx-auto leading-9">
              Upload your papers and generate important questions,
              analytics, and revision notes instantly.
            </p>

            <Button
              onClick={handleGetStarted}
              className="h-14 px-10 rounded-full bg-[#27c7b8] hover:bg-[#1eb7aa] text-[#07122b] text-lg font-semibold">
                Start Free Today
            </Button>

          </div>

        </div>

      </section>

    </div>
  )
}

export default LandingPage