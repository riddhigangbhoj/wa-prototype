'use client';

import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Search, Phone, Video, Smile, Mic, Paperclip, Send, Check, CheckCheck } from 'lucide-react';
import { Chat, Message } from '../mockData';
import { format } from 'date-fns';

interface ChatScreenProps {
  chat: Chat;
  onBack: () => void;
}

export default function ChatScreen({ chat, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      timestamp: new Date(),
      isSent: true,
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    if (status === 'read') {
      return <CheckCheck size={16} className="text-[#53BDEB]" />;
    } else if (status === 'delivered') {
      return <CheckCheck size={16} className="text-gray-500" />;
    } else if (status === 'sent') {
      return <Check size={16} className="text-gray-500" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE5DD]">
      {/* Header */}
      <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-3">
        <ArrowLeft
          size={24}
          className="cursor-pointer flex-shrink-0"
          onClick={onBack}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
          style={{ backgroundColor: chat.contact.avatar }}
        >
          {chat.contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-white truncate">{chat.contact.name}</h2>
          <p className="text-xs text-gray-200 truncate">{chat.contact.status || 'online'}</p>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <Video size={20} className="cursor-pointer" />
          <Phone size={20} className="cursor-pointer" />
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23ECE5DD\'/%3E%3Cpath d=\'M20 20l5 5m10-5l5 5m10-5l5 5m10-5l5 5M20 40l5 5m10-5l5 5m10-5l5 5m10-5l5 5M20 60l5 5m10-5l5 5m10-5l5 5m10-5l5 5M20 80l5 5m10-5l5 5m10-5l5 5m10-5l5 5\' stroke=\'%23D1D5DB\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3C/svg%3E")',
        }}
      >
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                  message.isSent
                    ? 'bg-[#DCF8C6] rounded-br-none'
                    : 'bg-white rounded-bl-none'
                }`}
              >
                <p className="text-sm text-gray-900 break-words whitespace-pre-wrap">
                  {message.text}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[11px] text-gray-500">
                    {format(message.timestamp, 'HH:mm')}
                  </span>
                  {message.isSent && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-[#F0F0F0] px-2 py-2 flex items-end gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
          <Smile size={24} className="text-gray-500 cursor-pointer flex-shrink-0" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
          />
          <Paperclip size={20} className="text-gray-500 cursor-pointer flex-shrink-0" />
        </div>
        {inputText.trim() ? (
          <button
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer hover:bg-[#20BD5A] active:bg-[#1DA851] flex-shrink-0"
          >
            <Send size={20} className="text-white" fill="white" />
          </button>
        ) : (
          <button className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer hover:bg-[#20BD5A] active:bg-[#1DA851] flex-shrink-0">
            <Mic size={20} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
