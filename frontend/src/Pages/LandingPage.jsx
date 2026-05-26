import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import landingImage from '../assets/landingImage'

const LandingPage = () => {
  return (
    <div>
        
        <div>

            {/* headings... */}
            <h1>
                Upload Previous Year Papers. Get Important Questions Instantly.
            </h1>

            <h3>
                Analyze repeated questions, unit weightage, derivations, and generate exam-focused revision notes automatically.
            </h3>


            {/* CTA Buttons */}
            <div>
                
                <Link to={"/"}>
                    <Button>Get Started</Button>
                </Link>

                <Link to={"/"}>
                    <Button>View Demo</Button>
                </Link>

            </div>


            {/* landing image */}
            <div>

                <img
                    src={landingImage}
                    alt='langinfImage'
                />

            </div>


            {/* How it works flow */}
            <div>
                
                <h1>How it Works</h1>

                <div>

                    <h1>Upload PDFs</h1>
                    <p>Upload previous year papers and notes.</p>

                </div>

                <div>

                    <h1>AI Analyzes Papers</h1>
                    <p>System detects repeated topics and unit trends.</p>

                </div>

                <div>

                    <h1>Get Exam Insights</h1>
                    <p>Receive important questions, analytics, and revision notes.</p>

                </div>

            </div>



            {/* Features... */}
            <div>

                <div>
                    <h1>Unit Weightage Heatmap</h1>
                    <p>Shows which units are most important based on previous year papers.</p>
                </div>

                <div>
                    <h1>Repeated Question Analytics</h1>
                    <p>Detects frequently asked questions and recurring concepts.</p>
                </div>

                <div>
                    <h1>Sem-Exam Style Answers</h1>
                    <p>Generates concise university-style answers with diagrams and flowcharts.</p>
                </div>

            </div>


            {/* Testimonials... */}
            <div>

                <div>
                    <p>"Saved hours before exams by identifying the most repeated questions instantly."</p>
                </div>

                <div>
                    <p>"The revision notes were more useful than manually making notes from multiple papers."</p>
                </div>

                <div>
                    <p>"The heatmap made it easy to focus only on important units."</p>
                </div>

            </div>


        </div>

    </div>
  )
}

export default LandingPage