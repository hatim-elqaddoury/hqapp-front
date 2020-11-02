const botName: any = "HQ-Bots";
const botAvatar: string = '../../../assets/images/chatbot.png';
const fileLink: string = 'http://google.com';


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





export const help =
  [
    {
      regExp: /([I,i]mage)|(IMAGE)|([P,p]ic)|(Picture)/g,
      answerArray: ['Hey look at this!', 'Ready to work', 'Yes, master.'],
      type: 'pic',
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        files: [
          {
            url: '',
            type: 'image/jpeg',
          },
        ],
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /([G,g]if)|(GIF)/g,
      type: 'gif',
      answerArray: ['No problem', 'Well done', 'You got it man'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        files: [
          {
            url: '',
            type: 'image/gif',
          },
        ],
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /([F,f]ile group)|(FILE)/g,
      type: 'group',
      answerArray: ['Take it!', 'Job Done.', 'As you wish'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        files: [
          {
            url: fileLink,
            icon: 'nb-compose',
          },
          {
            url: '',
            type: 'image/gif',
          },
          {
            url: '',
            type: 'image/jpeg',
          },
        ],
        icon: 'nb-compose',
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /([F,f]ile)|(FILE)/g,
      type: 'file',
      answerArray: ['Take it!', 'Job Done.', 'As you wish'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'file',
        files: [
          {
            url: fileLink,
            icon: 'nb-compose',
          },
        ],
        icon: 'nb-compose',
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /([M,m]ap)|(MAP)/g,
      type: 'map',
      answerArray: ['Done.', 'My sight is yours.', 'I shall be your eyes.'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'map',
        latitude: 53.914321,
        longitude: 27.5998355,
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /([Q,q]uote)|(QUOTE)/g,
      type: 'quote',
      answerArray: ['Quoted!', 'Say no more.', 'I gladly obey.'],
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        type: 'quote',
        quote: '',
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
    {
      regExp: /(.*)/g,
      answerArray: ['first, learn how to ask bro :p "help"'],
      type: 'text',
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        user: {
          name: botName,
          avatar: botAvatar,
        },
      },
    },
  ];
