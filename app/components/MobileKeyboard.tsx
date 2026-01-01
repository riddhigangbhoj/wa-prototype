'use client';

import React from 'react';
import { Smiley, Gif, Clipboard, Gear, DotsThree, MagnifyingGlass } from '@phosphor-icons/react';

export default function MobileKeyboard() {
  const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#D1D5DB] pb-2">
      {/* Toolbar above keyboard */}
      <div className="flex items-center justify-around py-2 px-4 bg-[#E5E7EB]">
        <button className="p-2 active:bg-gray-300 rounded-lg transition-colors">
          <Smiley size={24} className="text-gray-700" weight="regular" />
        </button>
        <button className="p-2 active:bg-gray-300 rounded-lg transition-colors">
          <Gif size={24} className="text-gray-700" weight="bold" />
        </button>
        <button className="p-2 active:bg-gray-300 rounded-lg transition-colors">
          <Clipboard size={24} className="text-gray-700" weight="regular" />
        </button>
        <button className="p-2 active:bg-gray-300 rounded-lg transition-colors">
          <Gear size={24} className="text-gray-700" weight="regular" />
        </button>
        <button className="p-2 active:bg-gray-300 rounded-lg transition-colors">
          <DotsThree size={24} className="text-gray-700" weight="bold" />
        </button>
      </div>

      {/* Number row */}
      <div className="flex gap-1 px-1 mb-2">
        {numberKeys.map((key) => (
          <button
            key={key}
            className="flex-1 bg-white rounded-md py-2.5 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Top letter row */}
      <div className="flex gap-1 px-1 mb-2">
        {topRow.map((key) => (
          <button
            key={key}
            className="flex-1 bg-white rounded-md py-2.5 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Middle letter row */}
      <div className="flex gap-1 px-1 mb-2">
        <div className="w-3"></div>
        {middleRow.map((key) => (
          <button
            key={key}
            className="flex-1 bg-white rounded-md py-2.5 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm"
          >
            {key}
          </button>
        ))}
        <div className="w-3"></div>
      </div>

      {/* Bottom letter row with shift and backspace */}
      <div className="flex gap-1 px-1 mb-2">
        <button className="bg-[#ACB3BB] rounded-md py-2.5 px-4 text-center text-[20px] font-normal text-black active:bg-gray-400 transition-colors shadow-sm">
          ⇧
        </button>
        {bottomRow.map((key) => (
          <button
            key={key}
            className="flex-1 bg-white rounded-md py-2.5 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm"
          >
            {key}
          </button>
        ))}
        <button className="bg-[#ACB3BB] rounded-md py-2.5 px-4 text-center text-[18px] font-normal text-black active:bg-gray-400 transition-colors shadow-sm flex items-center justify-center">
          ⌫
        </button>
      </div>

      {/* Bottom row with special keys */}
      <div className="flex gap-1 px-1">
        <button className="bg-[#ACB3BB] rounded-md py-2.5 px-3 text-center text-[15px] font-normal text-black active:bg-gray-400 transition-colors shadow-sm">
          !#1
        </button>
        <button className="bg-white rounded-md py-2.5 px-3 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm">
          ,
        </button>
        <button className="flex-1 bg-white rounded-md py-2.5 text-center text-[14px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm">
          English(India)
        </button>
        <button className="bg-white rounded-md py-2.5 px-3 text-center text-[20px] font-normal text-black active:bg-gray-200 transition-colors shadow-sm">
          .
        </button>
        <button className="bg-[#ACB3BB] rounded-md py-2.5 px-4 text-center active:bg-gray-400 transition-colors shadow-sm flex items-center justify-center">
          <MagnifyingGlass size={22} className="text-gray-700" weight="bold" />
        </button>
      </div>
    </div>
  );
}
