import FileUploader from '@/acomponents/FileUploader';
import React from 'react';
import homeImage from '../assets/homeImage.png';

const Home = () => {

  return (

    <div className="min-h-screen bg-[#f7fbfa] flex justify-center items-center">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <FileUploader />

          <div className="hidden lg:flex justify-center">

            <img
              src={homeImage}
              alt="Revizor AI Study Assistant"
              className="w-full max-w-lg"
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;