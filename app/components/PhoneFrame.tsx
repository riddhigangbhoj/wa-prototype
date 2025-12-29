import React from 'react';
import { WifiHigh, CellSignalFull, BatteryHigh } from "@phosphor-icons/react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  // Get current time
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl overflow-hidden border-[8px] border-black">
          {/* Screen */}
          <div className="relative w-full h-full bg-white overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-[44px] bg-white z-40 px-6 flex items-center justify-between text-[15px] font-semibold">
              {/* Left side - Time */}
              <div className="flex-1 text-black">
                {currentTime}
              </div>

              {/* Right side - Status icons */}
              <div className="flex items-center gap-1">
                {/* Cellular Signal */}
                <CellSignalFull size={16} weight="fill" />

                {/* WiFi */}
                <WifiHigh size={16} weight="fill" />

                {/* Battery icon */}
                <BatteryHigh size={22} weight="fill" />
              </div>
            </div>

            {/* Content area with padding for status bar */}
            <div className="pt-[44px] h-full overflow-hidden">
              {children}
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-900 rounded-full z-50"></div>
          </div>
        </div>

        {/* Power Button */}
        <div className="absolute right-0 top-[180px] w-[3px] h-[60px] bg-gray-800 rounded-l"></div>

        {/* Volume Buttons */}
        <div className="absolute left-0 top-[140px] w-[3px] h-[40px] bg-gray-800 rounded-r"></div>
        <div className="absolute left-0 top-[190px] w-[3px] h-[40px] bg-gray-800 rounded-r"></div>
      </div>
    </div>
  );
}
