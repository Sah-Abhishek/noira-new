import React from 'react';

function AutoPlayVideo() {
  const overlayColor = 'bg-[#FFA500]/20'; // semi-transparent overlay if you want

  return (
    <div className="bg-black text-white py-12 pt-25 px-4 text-center relative">
      {/* Images container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-15 relative">

        {/* First Image */}
        <div className="relative w-full max-w-[720px] aspect-video rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)]">

          <img
            src="/pic4.jpeg" // ✅ directly from public folder
            alt="Pic 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Second Image */}
        <div className="relative w-full max-w-[720px] aspect-video rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <img
            src="/pic3.jpeg" // ✅ directly from public folder
            alt="Pic 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default AutoPlayVideo;
