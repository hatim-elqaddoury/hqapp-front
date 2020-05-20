const botAvatar: string = ''; //https://avatars1.githubusercontent.com/u/32289823?s=460&u=63350a921390e13fc066bdb762ce18787e8713c8&v=4
export const gifsLinks: string[] = [
  'https://media.giphy.com/media/K0ZZjkjYKiD7y/giphy.gif',
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];

export const pimageLinks: string[] = [
  'https://picsum.photos/200/300'

];
const fileLink: string = 'http://google.com';

export const botReplies = [
  {
    regExp: /([C,c]hno smitek)|([S,s]smitek)|(t'es qui)|(t ki)|(t qui)/g,
      answerArray: ['Mada w nta ?', '3lach bghiti t3ref hh'],
      type: 'text',
      reply: {
        text: '',
        reply: false,
        date: new Date(),
        user: {
            name: 'Madalina',
            avatar: botAvatar,
        },
      },
  },
  {
      regExp: /([S,s]alam)|([S,s]salut)|([S,s]lt)|([C,c]oucou)|([C,c]c)|([C,c]C)/g,
      answerArray: ['que veux tu encore ? !', 'Salut !', 'Hey', 'Coucou !', 'pff, quoi ????'],
      type: 'text',
      reply: {
          text: '',
          reply: false,
          date: new Date(),
          user: {
              name: 'HQ Bot',
              avatar: botAvatar,
          },
      },
  },
  {
    regExp: /([A,a]feen)|([A,a]fayn)|([A,a]fin)|([F,f]in)|([F,f]iin)/g,
    answerArray: ['Ahlan !', 'Wesh ?', 'Hi gol salam be3da', 'Wash feha ?', 'chno baghi tani ??'],
    type: 'text',
    reply: {
        text: '',
        reply: false,
        date: new Date(),
        user: {
            name: 'HQ Bot',
            avatar: botAvatar,
        },
    },
  },
  {
    regExp: /([H,h]ey)|([H,h]i)/g,
    answerArray: ['Hello!', 'Yes?', 'Yes, milord?', 'What can I do for you?'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'HQ Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([H,h]elp)/g,
    answerArray: [`No problem! Try sending a message containing word "hey", "image",
    "gif", "file", "map", "quote", "file group" to see different message components`],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'HQ Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([T,t]swera)|([T,t]swera dyalk)/g,
    answerArray: ['ok haka!', 'wakha att', 'dacc'],
    type: 'ppic',
    reply: {
      text: 'ana',
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
        name: 'Madalina',
        avatar: botAvatar,
      },
    },
  },
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
        name: 'HQ Bot',
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
        name: 'HQ Bot',
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
        name: 'HQ Bot',
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
        name: 'HQ Bot',
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
        name: 'HQ Bot',
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
        name: 'HQ Bot',
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
        name: 'HQ helper',
        avatar: botAvatar,
      },
    },
  },
];
