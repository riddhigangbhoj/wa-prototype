'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Archive,
  Image,
  Video,
  Link,
  Headphones,
  File,
  Sticker,
  ChartBar,
  Lightning,
  BookmarkSimple,
  Star,
  PushPin,
  AirplaneTilt
} from '@phosphor-icons/react';
import MobileKeyboard from './MobileKeyboard';

interface SearchScreenProps {
  onBack: () => void;
  highlightQuickRecall?: boolean;
  onQuickRecallClick?: () => void;
  showKeyboard?: boolean;
  searchText?: string;
  useNormalSearch?: boolean;
  activeCase?: number;
  showLongPressHighlight?: boolean;
  showSaveAnimation?: boolean;
  messageSaved?: boolean;
  onMessageClick?: () => void;
}

interface FilterChip {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function SearchScreen({ onBack, highlightQuickRecall = false, onQuickRecallClick, showKeyboard: externalShowKeyboard, searchText = '', useNormalSearch = false, activeCase = 3, showLongPressHighlight = false, showSaveAnimation = false, messageSaved = false, onMessageClick }: SearchScreenProps) {
  const [internalShowKeyboard, setInternalShowKeyboard] = useState(false);
  const showKeyboard = externalShowKeyboard !== undefined ? externalShowKeyboard : internalShowKeyboard;
  const filterChips: FilterChip[] = [
    {
      id: 'unread',
      label: 'Unread',
      icon: <Archive size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: <Image size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: <Video size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'links',
      label: 'Links',
      icon: <Link size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'gifs',
      label: 'GIFs',
      icon: <span className="text-[#666666] text-[14px] font-bold">GIF</span>
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: <Headphones size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <File size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'stickers',
      label: 'Stickers',
      icon: <Sticker size={20} weight="regular" className="text-[#666666]" />
    },
    {
      id: 'polls',
      label: 'Polls',
      icon: <ChartBar size={20} weight="regular" className="text-[#666666]" />
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white absolute inset-0 z-50">
      {/* Header with Search Bar */}
      <div className="bg-[#F3F4F6] px-4 pt-3 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex-shrink-0 cursor-pointer active:opacity-60"
          >
            <ArrowLeft size={24} className="text-black" weight="regular" />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            autoFocus
            readOnly
            className="flex-1 bg-transparent text-[17px] text-black outline-none placeholder:text-[#8E8E93]"
          />
        </div>
      </div>

      {/* Quick Recall Banner - Only show on right side for all cases */}
      {!useNormalSearch && (
        <div
          onClick={() => {
            setInternalShowKeyboard(true);
            if (onQuickRecallClick) onQuickRecallClick();
          }}
          className={`px-4 py-3 bg-white border-b border-gray-100 cursor-pointer transition-all ${
            highlightQuickRecall
              ? 'ring-4 ring-[#25D366] ring-opacity-50 animate-pulse shadow-lg shadow-[#25D366]/30'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Lightning size={20} weight="fill" className="text-[#F5A623]" />
            <span className="text-[#128C7E] font-semibold text-[15px]">
              Quick Recall
            </span>
            <span className="text-[#8E8E93] text-[13px]">
              Smart view of saved content
            </span>
          </div>
        </div>
      )}

      {/* Filter Pills or Search Results */}
      <div className="bg-white flex-1 overflow-y-auto">
        {searchText ? (
          // Search Results
          <div className="px-0 py-0">
            {/* CASE 1: TEXT MESSAGES */}
            {activeCase === 1 && (
              <>
                {/* Normal search just shows "Messages" */}
                {useNormalSearch && (
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-[13px] font-semibold text-gray-500 uppercase">Messages</h3>
                  </div>
                )}

                {/* Quick Recall shows SAVED header */}
                {!useNormalSearch && (
                  <div className="px-4 py-4 bg-white border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <PushPin size={18} weight="fill" className="text-red-500" />
                      <h3 className="text-[14px] font-bold text-gray-800 uppercase">Saved</h3>
                    </div>
                  </div>
                )}

                {/* Both sides show Mom's message first (only on left/normal search) */}
                {useNormalSearch && (
                  <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E91E63] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        M
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="text-[15px] font-medium text-gray-900">Mom</h4>
                          <span className="text-[12px] text-gray-500 ml-2">Yesterday</span>
                        </div>
                        <p className="text-[14px] text-gray-600">
                          What time is <span className="font-semibold text-black">dinner</span> tonight?
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* John's message (only on left/normal search) */}
                {useNormalSearch && (
                  <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2196F3] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        J
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="text-[15px] font-medium text-gray-900">John Smith</h4>
                          <span className="text-[12px] text-gray-500 ml-2">3 days ago</span>
                        </div>
                        <p className="text-[14px] text-gray-600">
                          Let's have <span className="font-semibold text-black">dinner</span> at 7pm
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Starred message from Sarah - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#9C27B0] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Sarah</h4>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-[12px] text-gray-500">2 days ago</span>
                          <Star size={14} weight="fill" className="text-[#F5A623]" />
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        <span className="font-semibold text-black">Dinner</span> reservation at The Italian Corner - 8pm Friday
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emily's message (only on left/normal search) */}
                {useNormalSearch && (
                  <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        E
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="text-[15px] font-medium text-gray-900">Emily Watson</h4>
                          <span className="text-[12px] text-gray-500 ml-2">1 week ago</span>
                        </div>
                        <p className="text-[14px] text-gray-600">
                          Shall we go for <span className="font-semibold text-black">dinner</span> this weekend?
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dev Team message (only on left/normal search) */}
                {useNormalSearch && (
                  <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        D
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="text-[15px] font-medium text-gray-900">Dev Team</h4>
                          <span className="text-[12px] text-gray-500 ml-2">2 weeks ago</span>
                        </div>
                        <p className="text-[14px] text-gray-600">
                          Team <span className="font-semibold text-black">dinner</span> cancelled due to meeting
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Saved message from Message Yourself - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      M
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Message Yourself (you)</h4>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-[12px] text-gray-500">1 week ago</span>
                          <BookmarkSimple size={14} weight="fill" className="text-[#25D366]" />
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Anniversary <span className="font-semibold text-black">dinner</span> ideas: The Italian Corner, Spice Route, Blue Ocean
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Recall shows ALL other messages after saved ones */}
                {!useNormalSearch && (
                  <>
                    {/* Divider or "All Messages" header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-[13px] font-semibold text-gray-500 uppercase">All Messages</h3>
                    </div>

                    {/* Mom's message */}
                    <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E91E63] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          M
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="text-[15px] font-medium text-gray-900">Mom</h4>
                            <span className="text-[12px] text-gray-500 ml-2">Yesterday</span>
                          </div>
                          <p className="text-[14px] text-gray-600">
                            What time is <span className="font-semibold text-black">dinner</span> tonight?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* John's message */}
                    <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2196F3] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          J
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="text-[15px] font-medium text-gray-900">John Smith</h4>
                            <span className="text-[12px] text-gray-500 ml-2">3 days ago</span>
                          </div>
                          <p className="text-[14px] text-gray-600">
                            Let's have <span className="font-semibold text-black">dinner</span> at 7pm
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Emily's message */}
                    <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          E
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="text-[15px] font-medium text-gray-900">Emily Watson</h4>
                            <span className="text-[12px] text-gray-500 ml-2">1 week ago</span>
                          </div>
                          <p className="text-[14px] text-gray-600">
                            Shall we go for <span className="font-semibold text-black">dinner</span> this weekend?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dev Team message */}
                    <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          D
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1">
                            <h4 className="text-[15px] font-medium text-gray-900">Dev Team</h4>
                            <span className="text-[12px] text-gray-500 ml-2">2 weeks ago</span>
                          </div>
                          <p className="text-[14px] text-gray-600">
                            Team <span className="font-semibold text-black">dinner</span> cancelled due to meeting
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* CASE 2: DOCUMENTS (HOTEL) */}
            {activeCase === 2 && (
              <>
                {/* Both sides show "Messages" header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-[13px] font-semibold text-gray-500 uppercase">Messages</h3>
                </div>

                {/* Mom's message - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E91E63] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      M
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Mom</h4>
                        <span className="text-[12px] text-gray-500 ml-2">Yesterday</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Here's the <span className="font-semibold text-black">hotel</span> confirmation
                      </p>
                    </div>
                  </div>
                </div>

                {/* John's message - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2196F3] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">John Smith</h4>
                        <span className="text-[12px] text-gray-500 ml-2">3 days ago</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Check this <span className="font-semibold text-black">hotel</span> deal
                      </p>
                    </div>
                  </div>
                </div>

                {/* hotel.pdf from Sarah - Step 4: BOTH SIDES identical, then saving happens on right */}
                <div
                  onClick={() => {
                    if (showLongPressHighlight && onMessageClick) {
                      onMessageClick();
                    }
                  }}
                  className={`px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 transition-all ${
                    !useNormalSearch && showLongPressHighlight
                      ? 'ring-4 ring-orange-400 ring-opacity-50 animate-pulse shadow-lg shadow-orange-400/30 bg-orange-50'
                      : !useNormalSearch && showSaveAnimation
                      ? 'bg-green-50 ring-2 ring-green-400'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#9C27B0] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Sarah</h4>
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-[12px] text-gray-500">2 days ago</span>
                          {!useNormalSearch && messageSaved && <BookmarkSimple size={14} weight="fill" className="text-[#25D366]" />}
                          {!useNormalSearch && showSaveAnimation && (
                            <span className="text-[12px] text-green-600 font-semibold animate-bounce">Saving...</span>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 mb-2">
                        📄 <span className="font-semibold text-black">hotel</span>.pdf
                      </p>
                      {/* Long press hint - only on right side */}
                      {!useNormalSearch && showLongPressHighlight && (
                        <div className="bg-orange-100 border border-orange-300 rounded-lg px-3 py-2 mb-2">
                          <p className="text-[12px] text-orange-900 font-semibold">👆 Click to save this message</p>
                        </div>
                      )}
                      {/* Extracted content - only on right side after saved */}
                      {!useNormalSearch && messageSaved && (
                        <div className="bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
                          <div className="flex items-start gap-2 mb-1">
                            <span className="text-[12px] text-orange-900">📅 Check-in: Jan 15, 2025</span>
                          </div>
                          <div className="flex items-start gap-2 mb-1">
                            <span className="text-[12px] text-orange-900">📍 Mumbai, Lower Parel</span>
                          </div>
                          <div className="flex items-start gap-2 mb-1">
                            <span className="text-[12px] text-orange-900">💰 ₹12,500</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[12px] font-medium text-orange-900">🏨 Taj Mahal Palace</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emily's message - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      E
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Emily Watson</h4>
                        <span className="text-[12px] text-gray-500 ml-2">1 week ago</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Found a great <span className="font-semibold text-black">hotel</span> in Goa
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alex's message - BOTH SIDES */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Alex Johnson</h4>
                        <span className="text-[12px] text-gray-500 ml-2">2 weeks ago</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        The <span className="font-semibold text-black">hotel</span> was amazing!
                      </p>
                    </div>
                  </div>
                </div>

              </>
            )}

            {/* CASE 3: DOCUMENTS (BOARDING PASS) */}
            {activeCase === 3 && (
              <>
                {/* Quick Recall shows intelligent content search */}
                {!useNormalSearch && (
                  <div className="px-4 py-4 bg-white border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <PushPin size={18} weight="fill" className="text-red-500" />
                      <h3 className="text-[14px] font-bold text-gray-800 uppercase">From Your Saved Messages</h3>
                    </div>
                  </div>
                )}

                {/* Normal search just shows "Messages" */}
                {useNormalSearch && (
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-[13px] font-semibold text-gray-500 uppercase">Messages</h3>
                  </div>
                )}

            {/* Normal Search shows ALL results (5+) */}
            {useNormalSearch && (
              <>
                {/* Regular message from Sarah */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#9C27B0] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Sarah</h4>
                        <span className="text-[12px] text-gray-500 ml-2">Yesterday</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Are you <span className="font-semibold text-black">boarding</span> the flight at 3pm?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regular message from John */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2196F3] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">John Smith</h4>
                        <span className="text-[12px] text-gray-500 ml-2">3 days ago</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        <span className="font-semibold text-black">Boarding</span> starts at gate 12
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Search Result Item - Sarah (starred) - Smart Content Preview */}
            {!useNormalSearch ? (
              <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9C27B0] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-[15px] font-medium text-gray-900">Sarah</h4>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-[12px] text-gray-500">2 days ago</span>
                        <Star size={14} weight="fill" className="text-[#F5A623]" />
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-600 mb-2">
                      📄 sarah_<span className="font-semibold text-black">boarding</span>.pdf
                    </p>
                    {/* Intelligent content preview */}
                    <div className="bg-blue-50 rounded-lg px-3 py-2 flex items-center gap-2 border border-blue-200">
                      <AirplaneTilt size={18} weight="fill" className="text-blue-600 flex-shrink-0" />
                      <span className="text-[13px] font-medium text-blue-900">
                        Flight to Mumbai - Dec 30
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Normal search - just shows filename
              <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9C27B0] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-[15px] font-medium text-gray-900">Sarah</h4>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-[12px] text-gray-500">2 days ago</span>
                        <Star size={14} weight="fill" className="text-[#F5A623]" />
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-600">
                      📄 sarah_<span className="font-semibold text-black">boarding</span>.pdf
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Normal Search shows regular messages too */}
            {useNormalSearch && (
              <>
                {/* Another regular message */}
                <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      E
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-[15px] font-medium text-gray-900">Emily Watson</h4>
                        <span className="text-[12px] text-gray-500 ml-2">1 week ago</span>
                      </div>
                      <p className="text-[14px] text-gray-600">
                        Check the <span className="font-semibold text-black">boarding</span> pass I sent you
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Search Result Item - Message Yourself (saved) - Smart Content Preview */}
            {!useNormalSearch ? (
              <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-[15px] font-medium text-gray-900">Message Yourself (you)</h4>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-[12px] text-gray-500">5 days ago</span>
                        <BookmarkSimple size={14} weight="fill" className="text-[#25D366]" />
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-600 mb-2">
                      📄 <span className="font-semibold text-black">boarding</span>_pass.pdf
                    </p>
                    {/* Intelligent content preview */}
                    <div className="bg-blue-50 rounded-lg px-3 py-2 flex items-center gap-2 border border-blue-200">
                      <AirplaneTilt size={18} weight="fill" className="text-blue-600 flex-shrink-0" />
                      <span className="text-[13px] font-medium text-blue-900">
                        Flight to Delhi - Dec 28
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Normal search - just shows filename
              <div className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-[15px] font-medium text-gray-900">Message Yourself (you)</h4>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-[12px] text-gray-500">5 days ago</span>
                        <BookmarkSimple size={14} weight="fill" className="text-[#25D366]" />
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-600">
                      📄 <span className="font-semibold text-black">boarding</span>_pass.pdf
                    </p>
                  </div>
                </div>
              </div>
            )}
              </>
            )}
          </div>
        ) : (
          // Filter Pills
          <div className="px-4 py-6">
            <div className="flex flex-wrap gap-3">
              {filterChips.map((chip) => (
                <button
                  key={chip.id}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E9EAEC] hover:bg-[#D9DADC] active:bg-[#C9CACC] transition-colors cursor-pointer"
                >
                  {chip.icon}
                  <span className="text-[15px] font-normal text-[#3C3C43]">
                    {chip.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Empty state */}
            <div className="mt-12 text-center text-gray-400">
              <p className="text-sm">Search for messages, photos, and more</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Keyboard */}
      {showKeyboard && <MobileKeyboard />}
    </div>
  );
}
