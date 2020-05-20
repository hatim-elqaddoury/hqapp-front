const botName: any = "HQ-Bots";
const botAvatar: string = '../../../assets/images/chatbot.png';

export const messages =
  [
    {
      text: '👋 Hello! Welcome to Pandorabots',
      reply: false,
      date: new Date(),
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: false,
      date: new Date(),
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
  ];


/*
  [
    {
      text: '👋 Hello! Welcome to Pandorabots',
      reply: false,
      date: new Date(),
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: true,
      date: new Date(),
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Hello, how are you?',
      reply: false,
      date: new Date(),
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Hey looks at that pic I just found!',
      reply: false,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: 'https://i.gifer.com/no.gif',
          type: 'image/jpeg',
          icon: false,
        },
      ],
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'What do you mean by that?',
      reply: false,
      date: new Date(),
      type: 'quote',
      quote: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Attached is an archive I mentioned',
      reply: true,
      date: new Date(),
      type: 'file',
      files: [
        {
          url: 'https://i.gifer.com/no.gif',
          icon: 'file-text-outline',
        },
      ],
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
    {
      text: 'Meet me there',
      reply: false,
      date: new Date(),
      type: 'map',
      latitude: 40.714728,
      longitude: -73.998672,
      user: {
        name: botName,
        avatar: botAvatar,
      },
    },
  ];
*/