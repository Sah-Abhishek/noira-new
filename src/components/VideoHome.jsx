import React from 'react';

import video1 from '../assets/videos/1.mp4';
import video2 from '../assets/videos/2.mp4';
import video3 from '../assets/videos/3.mov';
function AutoPlayVideo() {
  const overlayColor = 'bg-[#FFA500]/20'; // semi-transparent black overlay

  return (
    <div className="bg-black text-white py-12 pt-25 px-4 text-center relative">
      {/* <h2 className="text-4xl font-braven text-[#D59940] font-whisper font-bold mb-6 text-center"> */}
      {/*   At Home Treatment */}
      {/* </h2> */}

      {/* Videos container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 relative">
        {/* First Video */}
        <div className="relative w-full max-w-[720px] aspect-video rounded-lg shadow-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={video3}
            autoPlay
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          {/* <div className={`absolute inset-0 ${overlayColor} z-10`} /> */}
        </div>

        {/* Second Video */}
        <div className="relative w-full max-w-[720px] aspect-video rounded-lg shadow-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src={video2}
            autoPlay
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          {/* <div className={`absolute inset-0 ${overlayColor} z-10`} /> */}
        </div>
      </div>
    </div>
  );
}

export default AutoPlayVideo;
