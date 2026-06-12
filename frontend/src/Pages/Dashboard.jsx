import DashNav from '@/acomponents/DashNav';
import Unit from '@/acomponents/Unit';
import Frequency from '@/acomponents/Frequency';
import AnswerPdf from '@/acomponents/AnswerPdf';
import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

const Dashboard = () => {

  const hasData =
    localStorage.getItem(
      "dashboardData"
    );

  const userId =
    localStorage.getItem(
      "userId"
    );

  if (!userId) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!hasData) {
    return (
      <Navigate
        to="/upload"
        replace
      />
    );
  }

  return (

    <div className="w-full min-h-screen">

      <DashNav />

      <Routes>

        <Route
          index
          element={
            <Navigate
              to="unit"
              replace
            />
          }
        />

        <Route
          path="unit"
          element={<Unit />}
        />

        <Route
          path="frequency"
          element={<Frequency />}
        />

        <Route
          path="answer"
          element={<AnswerPdf />}
        />

      </Routes>

    </div>
  );
};

export default Dashboard;