'use client';

import React, { useState } from 'react';
import {
  MagnifyingGlass,
  DotsThreeCircle,
  Camera,
  Plus,
  ArchiveBox,
  Checks,
  PushPin,
  SpeakerSlash,
  ChatCircleText,
  Phone,
  UsersThree,
  ChatsCircle,
  Gear
} from 'phosphor-react';
import { Chat } from '../mockData';
import { format, isToday, isYesterday } from 'date-fns';

interface ChatListScreenProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  onSearchClick: () => void;
  highlightSearch?: boolean;
}

interface FilterOption {
  id: string;
  label: string;
}

export default function ChatListScreen({ chats, onSelectChat, onSearchClick, highlightSearch = false }: ChatListScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread 226' },
    { id: 'favourites', label: 'Favourites' },
    { id: 'groups', label: 'Groups 17' },
  ];

  const formatTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else if (Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return format(date, 'dd/MM/yy');
    } else {
      return format(date, 'dd/MM/yy');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="bg-white px-5 pt-3 pb-2 z-10">
        <div className="flex items-center justify-between mb-3">
          <DotsThreeCircle size={24} color="#007AFF" weight="regular" className="cursor-pointer" />

          <div className="flex items-center gap-4">
            <Camera size={24} className="cursor-pointer text-black" weight="fill" />
            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer shadow-sm">
              <Plus size={20} className="text-white" weight="bold" />
            </div>
          </div>
        </div>

        <h1 className="text-[32px] font-bold text-black leading-tight mb-3 tracking-wide">Chats</h1>

        {/* Search Bar */}
        <div
          onClick={onSearchClick}
          className={`bg-[#F3F4F6] rounded-[10px] px-3 py-2 flex items-center gap-2 mb-4 cursor-pointer transition-all ${
            highlightSearch
              ? 'ring-4 ring-[#25D366] ring-opacity-50 animate-pulse shadow-lg shadow-[#25D366]/30'
              : 'hover:bg-[#E8E9EB]'
          }`}
        >
          <MagnifyingGlass size={18} className="text-[#8E8E93]" weight="bold" />
          <span className="flex-1 text-[17px] text-[#8E8E93]">
            Search
          </span>
        </div>

        {/* Filter Chips */}
        <div className="-mx-5 overflow-x-auto scrollbar-hide px-5 pb-2">
          <div className="flex gap-2 w-max">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center px-3.5 py-1.5 rounded-full transition-colors text-[14px] font-medium ${selectedFilter === filter.id
                    ? 'bg-[#Dcf8c6] text-[#128C7E]' // Selected state approximation
                    : 'bg-[#F3F4F6] text-[#8E8E93]'
                  } ${filter.id === 'all' && selectedFilter === 'all' ? '!bg-[#E7FBF0] !text-[#1DA666]' : ''}`} // Specific highlight for 'All' if needed or generic green
              >
                {filter.label}
              </button>
            ))}
            {/* Adding a generic "+" button at the end of filters if implied by screenshot loop, but screenshot ends at 'Groups 17'. 
                The screenshot actually shows 'All' is green text on light green bg. 
                Let's fix styles closer to screenshot:
            */}
            <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#8E8E93]">
              <Plus size={16} weight="bold" />
            </div>
          </div>
        </div>
      </div>

      <div className='h-[1px] bg-gray-200 w-full'></div>


      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-white">

        {/* Archived Row */}
        <div className="flex items-center gap-4 px-5 py-3 active:bg-gray-50 cursor-pointer">
          <ArchiveBox size={20} className="text-[#8E8E93]" weight="bold" />
          <span className="flex-1 text-[17px] font-semibold text-black">Archived</span>
          <span className="text-[#8E8E93] text-[15px]">124</span>
        </div>

        <div className="ml-20 h-[0.5px] bg-gray-200"></div>

        {/* Chat List */}
        <div className="pb-20"> {/* Padding for bottom nav */}
          {chats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <div
                onClick={() => onSelectChat(chat.id)}
                className="flex items-start px-5 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer group"
              >
                {/* Avatar */}
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-medium text-xl flex-shrink-0 mr-3 relative overflow-hidden"
                  style={{ backgroundColor: chat.contact.avatar.startsWith('#') ? chat.contact.avatar : '#cfd8dc' }}
                >
                  {/* Placeholder for real images */}
                  {chat.contact.avatar.startsWith('#') ? chat.contact.name.charAt(0).toUpperCase() : null}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center h-[52px]">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-[17px] text-black truncate flex-1">
                      {chat.contact.name}
                    </h3>
                    <span className={`text-[14px] ${chat.unreadCount ? 'text-[#25D366]' : 'text-[#8E8E93]'} flex-shrink-0 ml-2 font-normal`}>
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0 gap-1">
                      {/* Status Checks (Simulation) */}
                      {chat.messages.length > 0 && chat.messages[chat.messages.length - 1].isSent && (
                        <Checks size={18} weight="regular" className="text-[#34B7F1]" />
                      )}

                      <p className={`text-[15px] truncate leading-tight ${chat.unreadCount ? 'text-black font-medium' : 'text-[#666666]'}`}>
                        {/* Simulation of Group sender name */}
                        {chat.contact.name.includes("GSoC") && <span className="text-[#8E8E93]">~ Aayush: </span>}
                        {chat.lastMessage}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      {/* Simulation of Pinned/Muted icons based on index/context since removed from mockData */}
                      {(index < 3) && <PushPin size={14} weight="fill" className="text-[#8E8E93] rotate-45" />}
                      {/* Unread Badge */}
                      {chat.unreadCount && chat.unreadCount > 0 && (
                        <span className="bg-[#25D366] text-white text-[12px] font-bold px-1.5 h-5 rounded-full flex items-center justify-center min-w-[20px]">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Separator */}
              <div className="ml-20 h-[0.5px] bg-gray-200"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#F8F8F8] border-t border-[#B2B2B2] h-[83px] w-full absolute bottom-0 flex items-start justify-around pt-2 px-2 pb-5 z-20">
        <div className="flex flex-col items-center gap-1 w-16 cursor-pointer">
          <ChatCircleText size={26} className="text-[#898989]" weight="regular" />
          <span className="text-[10px] font-medium text-[#898989]">Updates</span>
        </div>

        <div className="flex flex-col items-center gap-1 w-16 cursor-pointer">
          <Phone size={26} className="text-[#898989]" weight="regular" />
          <span className="text-[10px] font-medium text-[#898989]">Calls</span>
        </div>

        <div className="flex flex-col items-center gap-1 w-16 cursor-pointer">
          <UsersThree size={26} className="text-[#898989]" weight="regular" />
          <span className="text-[10px] font-medium text-[#898989]">Communities</span>
        </div>

        <div className="flex flex-col items-center gap-1 w-16 cursor-pointer relative">
          <div className="relative">
            <ChatsCircle size={26} className="text-black" weight="fill" />
            <span className="bg-[#25D366] text-white text-[10px] font-bold px-1 rounded-full absolute -top-1 -right-2 min-w-[16px] h-[16px] flex items-center justify-center">226</span>
          </div>
          <span className="text-[10px] font-medium text-black">Chats</span>
        </div>

        <div className="flex flex-col items-center gap-1 w-16 cursor-pointer">
          <Gear size={26} className="text-[#898989]" weight="regular" />
          <span className="text-[10px] font-medium text-[#898989]">Settings</span>
        </div>
      </div>


      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
