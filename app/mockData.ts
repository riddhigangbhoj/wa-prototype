export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  contact: Contact;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
}

export const mockChats: Chat[] = [
  {
    id: '1',
    contact: {
      id: '1',
      name: 'Mom',
      avatar: '#E91E63',
      status: 'online'
    },
    lastMessage: 'Don\'t forget to call me later!',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    unreadCount: 2,
    messages: [
      {
        id: '1',
        text: 'Hi! How are you?',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'I\'m good! Just working on a project',
        timestamp: new Date(Date.now() - 55 * 60 * 1000),
        isSent: true,
        status: 'read'
      },
      {
        id: '3',
        text: 'That\'s great! What are you building?',
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '4',
        text: 'A WhatsApp clone with Next.js',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isSent: true,
        status: 'read'
      },
      {
        id: '5',
        text: 'Sounds interesting!',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '6',
        text: 'Don\'t forget to call me later!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isSent: false,
        status: 'delivered'
      }
    ]
  },
  {
    id: '2',
    contact: {
      id: '2',
      name: 'Sarah',
      avatar: '#9C27B0',
      status: 'typing...'
    },
    lastMessage: 'See you tomorrow!',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    messages: [
      {
        id: '1',
        text: 'Hey! Are we still on for coffee tomorrow?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'Yes! 10am at the usual place?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isSent: true,
        status: 'read'
      },
      {
        id: '3',
        text: 'Perfect! See you tomorrow!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isSent: false,
        status: 'read'
      }
    ]
  },
  {
    id: '3',
    contact: {
      id: '3',
      name: 'John Smith',
      avatar: '#2196F3',
      status: 'last seen today at 2:30 PM'
    },
    lastMessage: 'Thanks for your help!',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messages: [
      {
        id: '1',
        text: 'Can you help me with that bug?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'Sure! What\'s the issue?',
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        isSent: true,
        status: 'read'
      },
      {
        id: '3',
        text: 'Never mind, I figured it out!',
        timestamp: new Date(Date.now() - 2.2 * 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      },
      {
        id: '4',
        text: 'Thanks for your help!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      }
    ]
  },
  {
    id: '4',
    contact: {
      id: '4',
      name: 'Dev Team',
      avatar: '#4CAF50',
      status: 'last seen yesterday at 11:45 PM'
    },
    lastMessage: 'Meeting at 3pm',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 5,
    messages: [
      {
        id: '1',
        text: 'Team meeting tomorrow',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isSent: false,
        status: 'delivered'
      },
      {
        id: '2',
        text: 'Meeting at 3pm',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isSent: false,
        status: 'delivered'
      }
    ]
  },
  {
    id: '5',
    contact: {
      id: '5',
      name: 'Emily Watson',
      avatar: '#FF9800',
      status: 'last seen 2 days ago'
    },
    lastMessage: 'Sounds good!',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: '1',
        text: 'Want to grab lunch this week?',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isSent: true,
        status: 'read'
      },
      {
        id: '2',
        text: 'Sounds good!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isSent: false,
        status: 'read'
      }
    ]
  },
  {
    id: '6',
    contact: {
      id: '6',
      name: 'Alex Johnson',
      avatar: '#00BCD4',
      status: 'last seen last week'
    },
    lastMessage: 'You: Got it, thanks!',
    lastMessageTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: '1',
        text: 'Check out this article',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 60000),
        isSent: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'Got it, thanks!',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isSent: true,
        status: 'read'
      }
    ]
  }
];
