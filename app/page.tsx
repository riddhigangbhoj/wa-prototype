'use client';

import { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import ChatListScreen from './components/ChatListScreen';
import ChatScreen from './components/ChatScreen';
import { mockChats } from './mockData';

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  return (
    <PhoneFrame>
      {selectedChat ? (
        <ChatScreen
          chat={selectedChat}
          onBack={() => setSelectedChatId(null)}
        />
      ) : (
        <ChatListScreen
          chats={mockChats}
          onSelectChat={setSelectedChatId}
        />
      )}
    </PhoneFrame>
  );
}
