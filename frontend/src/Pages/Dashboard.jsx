import DashNav from '@/acomponents/DashNav'
import Unit from '@/acomponents/Unit'
import Frequency from '@/acomponents/Frequency'
import AnswerPdf from '@/acomponents/AnswerPdf'
// import { Button } from '@/components/ui/button'
import React from 'react'
import { Routes, Route } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div className='flex justify-center items-center'>

        <DashNav/>

        <Routes>
          <Route path="unit" element={<Unit/>}/>
          <Route path="frequency" element={<Frequency/>} />
          <Route path="answer" element={<AnswerPdf/>} />
        </Routes>

    </div>
  )
}

export default Dashboard