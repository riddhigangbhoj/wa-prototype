'use client';

import { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import ChatListScreen from './components/ChatListScreen';
import ChatScreen from './components/ChatScreen';
import SearchScreen from './components/SearchScreen';
import { mockChats } from './mockData';

// Left Phone: Normal Search Flow (Ends at Step 4)
const normalSearchSteps = [
  {
    id: 1,
    title: 'Chat List',
    description: 'Starting point - main chat list screen.',
  },
  {
    id: 2,
    title: 'Click Search',
    description: 'User clicks on the search bar.',
  },
  {
    id: 3,
    title: 'Search Screen',
    description: 'Search screen opens with filter pills.',
  },
  {
    id: 4,
    title: 'Type "boarding"',
    description: 'User types "boarding" directly - shows ALL messages.',
  },
];

// Right Phone: Quick Recall Flow
const quickRecallSteps = [
  {
    id: 1,
    title: 'Chat List',
    description: 'Starting point - same chat list screen.',
  },
  {
    id: 2,
    title: 'Click Search',
    description: 'User clicks on the search bar.',
  },
  {
    id: 3,
    title: 'Search Screen',
    description: 'Search screen opens with Quick Recall banner.',
  },
  {
    id: 4,
    title: 'Click Quick Recall',
    description: 'User clicks Quick Recall banner - keyboard appears for smart search.',
  },
  {
    id: 5,
    title: 'Smart Results',
    description: 'Shows only 2 filtered results: saved & starred messages - quick and precise!',
  },
];

// For Case 1 - different step 4
const quickRecallStepsCase1 = [
  {
    id: 1,
    title: 'Chat List',
    description: 'Starting point - same chat list screen.',
  },
  {
    id: 2,
    title: 'Click Search',
    description: 'User clicks on the search bar.',
  },
  {
    id: 3,
    title: 'Search Screen',
    description: 'Search screen opens with Smart Recall banner.',
  },
  {
    id: 4,
    title: 'Smart Results',
    description: 'Smart Recall shows saved messages first, then all other messages - organized and easy to find!',
  },
];

// For Case 2 - Save flow with more steps
const quickRecallStepsCase2 = [
  {
    id: 1,
    title: 'Chat List',
    description: 'Starting point - same chat list screen.',
  },
  {
    id: 2,
    title: 'Click Search',
    description: 'User clicks on the search bar.',
  },
  {
    id: 3,
    title: 'Search Screen',
    description: 'Search screen opens with filter pills.',
  },
  {
    id: 4,
    title: 'Search Results',
    description: 'Both sides show hotel.pdf from Sarah.',
  },
  {
    id: 5,
    title: 'Long Press',
    description: 'User long presses hotel.pdf to save it with Smart Saving.',
  },
  {
    id: 6,
    title: 'Saving',
    description: 'Smart Saving automatically saves message to Message Yourself.',
  },
  {
    id: 7,
    title: 'Saved & Extracted',
    description: 'Smart Saving extracts hotel details: Check-in, Location, Amount, Entity! Next time searching "Mumbai" or "Jan 15" will instantly find this saved message.',
  },
];

export default function Home() {
  // Current active case (1, 2, or 3)
  const [activeCase, setActiveCase] = useState(1);

  // Global demo step - both phones sync to this
  const [demoStep, setDemoStep] = useState(1);

  // Left phone state (Normal Search)
  const [leftSelectedChatId, setLeftSelectedChatId] = useState<string | null>(null);
  const [leftIsSearchOpen, setLeftIsSearchOpen] = useState(false);
  const [leftShowSearchHighlight, setLeftShowSearchHighlight] = useState(false);

  // Right phone state (Quick Recall)
  const [rightSelectedChatId, setRightSelectedChatId] = useState<string | null>(null);
  const [rightIsSearchOpen, setRightIsSearchOpen] = useState(false);
  const [rightShowSearchHighlight, setRightShowSearchHighlight] = useState(false);
  const [rightShowQuickRecallHighlight, setRightShowQuickRecallHighlight] = useState(false);
  const [rightShowLongPressHighlight, setRightShowLongPressHighlight] = useState(false);
  const [rightShowSaveAnimation, setRightShowSaveAnimation] = useState(false);
  const [rightMessageSaved, setRightMessageSaved] = useState(false);

  const leftSelectedChat = mockChats.find(chat => chat.id === leftSelectedChatId);
  const rightSelectedChat = mockChats.find(chat => chat.id === rightSelectedChatId);

  const normalSearchStep = normalSearchSteps.find(step => step.id === demoStep);
  const quickRecallStep = (activeCase === 3 ? quickRecallSteps : activeCase === 2 ? quickRecallStepsCase2 : quickRecallStepsCase1).find(step => step.id === demoStep);

  // Determine max steps based on active case
  const maxSteps = activeCase === 3 ? 5 : activeCase === 2 ? 7 : 4;

  // Prevent unused variable warnings
  void leftSelectedChatId;
  void rightSelectedChatId;

  // Handle case change - reset everything
  const handleCaseChange = (caseNumber: number) => {
    setActiveCase(caseNumber);
    setDemoStep(1);
    setLeftIsSearchOpen(false);
    setRightIsSearchOpen(false);
    setLeftShowSearchHighlight(false);
    setRightShowSearchHighlight(false);
    setRightShowQuickRecallHighlight(false);
    setRightShowLongPressHighlight(false);
    setRightShowSaveAnimation(false);
    setRightMessageSaved(false);
    setLeftSelectedChatId(null);
    setRightSelectedChatId(null);
  };

  const handleNext = () => {
    if (demoStep === 1) {
      setDemoStep(2);
      setLeftShowSearchHighlight(true);
      setRightShowSearchHighlight(true);
    } else if (demoStep === 2) {
      setLeftShowSearchHighlight(false);
      setRightShowSearchHighlight(false);
      setLeftIsSearchOpen(true);
      setRightIsSearchOpen(true);
      setDemoStep(3);
    } else if (demoStep === 3) {
      // For Case 3, go to step 4 (Quick Recall highlight)
      // For Case 1 and 2, go to step 4 (search results)
      if (activeCase === 3) {
        setDemoStep(4);
        setRightShowQuickRecallHighlight(true);
      } else {
        setDemoStep(4);
      }
    } else if (demoStep === 4) {
      if (activeCase === 3) {
        // Case 3: step 4 -> step 5
        setDemoStep(5);
        setRightShowQuickRecallHighlight(false);
      } else if (activeCase === 2) {
        // Case 2: step 4 -> step 5 (show long press highlight)
        setDemoStep(5);
        setRightShowLongPressHighlight(true);
      } else {
        // Case 1: done at step 4
      }
    } else if (demoStep === 5 && activeCase === 2) {
      // Case 2: step 5 -> step 6 (show save animation)
      setDemoStep(6);
      setRightShowLongPressHighlight(false);
      setRightShowSaveAnimation(true);
    } else if (demoStep === 6 && activeCase === 2) {
      // Case 2: step 6 -> step 7 (message saved, show extracted content)
      setDemoStep(7);
      setRightShowSaveAnimation(false);
      setRightMessageSaved(true);
    }
  };

  const handlePrevious = () => {
    if (demoStep === 7 && activeCase === 2) {
      // Case 2: step 7 -> step 6
      setDemoStep(6);
      setRightMessageSaved(false);
      setRightShowSaveAnimation(true);
    } else if (demoStep === 6 && activeCase === 2) {
      // Case 2: step 6 -> step 5
      setDemoStep(5);
      setRightShowSaveAnimation(false);
      setRightShowLongPressHighlight(true);
    } else if (demoStep === 5) {
      if (activeCase === 3) {
        setDemoStep(4);
        setRightShowQuickRecallHighlight(true);
      } else if (activeCase === 2) {
        // Case 2: step 5 -> step 4
        setDemoStep(4);
        setRightShowLongPressHighlight(false);
      }
    } else if (demoStep === 4) {
      if (activeCase === 3) {
        setRightShowQuickRecallHighlight(false);
      }
      setDemoStep(3);
    } else if (demoStep === 3) {
      setLeftIsSearchOpen(false);
      setRightIsSearchOpen(false);
      setDemoStep(2);
      setLeftShowSearchHighlight(true);
      setRightShowSearchHighlight(true);
    } else if (demoStep === 2) {
      setLeftShowSearchHighlight(false);
      setRightShowSearchHighlight(false);
      setDemoStep(1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 gap-0">
      {/* Case Selector */}
      <div className="flex gap-4 bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={() => handleCaseChange(1)}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            activeCase === 1
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
              : demoStep === maxSteps && activeCase === 3
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 ring-4 ring-purple-400 ring-opacity-50 animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Smart Recall
        </button>
        <button
          onClick={() => handleCaseChange(2)}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            activeCase === 2
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
              : demoStep === maxSteps && activeCase === 1
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 ring-4 ring-orange-400 ring-opacity-50 animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Smart Saving
        </button>
        <button
          onClick={() => handleCaseChange(3)}
          className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
            activeCase === 3
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
              : demoStep === maxSteps && activeCase === 2
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 ring-4 ring-blue-400 ring-opacity-50 animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Quick Recall
        </button>
      </div>

      {/* Instruction Note - Below Case Buttons */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-2 mt-2 mb-1 max-w-2xl">
        <p className="text-sm text-blue-900 font-medium text-center">
          📌 Demo Flow: Start with <span className="font-bold">Smart Recall</span> → then <span className="font-bold">Smart Saving</span> → then <span className="font-bold">Quick Recall</span>
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-0">
        {/* Left Note - Above Phone */}
        <div className="w-72 bg-white rounded-lg shadow-lg px-4 py-2 mb-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-sm font-bold">{Math.min(demoStep, 4)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-extrabold text-gray-800">Normal Search - Step {Math.min(demoStep, 4)} of 4</h3>
              <p className="text-xs text-gray-700 font-semibold leading-tight">
                {demoStep >= 4
                  ? activeCase === 1
                    ? "Shows 5+ mixed results: starred, saved, and regular messages - harder to find what you need."
                    : activeCase === 2
                    ? "Shows all 5 contacts with 'hotel' - no filtering, no extraction."
                    : "Shows 5+ mixed results: starred, saved, and regular messages - harder to find what you need."
                  : normalSearchStep?.description}
              </p>
            </div>
          </div>
        </div>

      {/* Left Phone: Normal Search - Stops at Step 4 */}
      <PhoneFrame>
        {leftIsSearchOpen ? (
          <SearchScreen
            onBack={() => setLeftIsSearchOpen(false)}
            highlightQuickRecall={false}
            showKeyboard={demoStep >= 4}
            searchText={demoStep >= 4 ? (activeCase === 1 ? 'dinner' : activeCase === 2 ? 'hotel' : 'boarding') : ''}
            useNormalSearch={true}
            activeCase={activeCase}
          />
        ) : leftSelectedChat ? (
          <ChatScreen
            chat={leftSelectedChat}
            onBack={() => setLeftSelectedChatId(null)}
          />
        ) : (
          <ChatListScreen
            chats={mockChats}
            onSelectChat={setLeftSelectedChatId}
            onSearchClick={() => {
              if (demoStep === 2) {
                handleNext();
              }
            }}
            highlightSearch={leftShowSearchHighlight}
          />
        )}
      </PhoneFrame>
      </div>

      {/* Center Navigation */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleNext}
          disabled={demoStep === maxSteps}
          className="w-20 h-20 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#1fa855] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center"
        >
          Next
        </button>
        <button
          onClick={handlePrevious}
          disabled={demoStep === 1}
          className="w-20 h-20 bg-gray-300 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (activeCase < 3) {
              handleCaseChange(activeCase + 1);
            }
          }}
          disabled={demoStep !== maxSteps || activeCase === 3}
          className={`w-20 h-20 rounded-full font-bold text-xs transition-all shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center ${
            demoStep === maxSteps && activeCase < 3
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white animate-pulse ring-4 ring-purple-400 ring-opacity-50 hover:from-purple-600 hover:to-purple-700'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          Next Case
        </button>
        <button
          onClick={() => {
            setDemoStep(1);
            setLeftIsSearchOpen(false);
            setRightIsSearchOpen(false);
            setLeftShowSearchHighlight(false);
            setRightShowSearchHighlight(false);
            setRightShowQuickRecallHighlight(false);
            setRightShowLongPressHighlight(false);
            setRightShowSaveAnimation(false);
            setRightMessageSaved(false);
          }}
          className="w-20 h-20 bg-blue-500 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col items-center gap-0">
        {/* Right Note - Above Phone */}
        <div className="w-72 bg-white rounded-lg shadow-lg px-4 py-2 mb-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#25D366] to-[#1fa855] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-sm font-bold">{demoStep}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-extrabold text-gray-800">
                {activeCase === 1 ? 'Smart Recall' : activeCase === 2 ? 'Smart Saving' : 'Quick Recall'} - Step {demoStep} of {maxSteps}
              </h3>
              <p className="text-xs text-gray-700 font-semibold leading-tight">{quickRecallStep?.description}</p>
            </div>
          </div>
        </div>

      {/* Right Phone: Quick Recall */}
      <PhoneFrame>
        {rightIsSearchOpen ? (
          <SearchScreen
            onBack={() => setRightIsSearchOpen(false)}
            highlightQuickRecall={rightShowQuickRecallHighlight}
            showKeyboard={activeCase === 3 ? demoStep >= 4 : demoStep >= 4}
            searchText={activeCase === 3 ? (demoStep >= 5 ? (activeCase === 1 ? 'dinner' : activeCase === 2 ? 'hotel' : 'boarding') : '') : (demoStep >= 4 ? (activeCase === 1 ? 'dinner' : activeCase === 2 ? 'hotel' : 'boarding') : '')}
            useNormalSearch={false}
            activeCase={activeCase}
            showLongPressHighlight={rightShowLongPressHighlight}
            showSaveAnimation={rightShowSaveAnimation}
            messageSaved={rightMessageSaved}
            onQuickRecallClick={() => {
              if (demoStep === 4 && activeCase === 3) {
                handleNext();
              }
            }}
            onMessageClick={() => {
              if (demoStep === 5 && activeCase === 2) {
                handleNext();
              }
            }}
          />
        ) : rightSelectedChat ? (
          <ChatScreen
            chat={rightSelectedChat}
            onBack={() => setRightSelectedChatId(null)}
          />
        ) : (
          <ChatListScreen
            chats={mockChats}
            onSelectChat={setRightSelectedChatId}
            onSearchClick={() => {
              if (demoStep === 2) {
                handleNext();
              }
            }}
            highlightSearch={rightShowSearchHighlight}
          />
        )}
      </PhoneFrame>
      </div>
      </div>
    </div>
  );
}
