import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/public/dashboard',
  },
  {
    title: 'Personnal section',
    group: true,
  },
  {
      title: 'home',
      icon: 'home-outline',
      link: '/public/home',
      home: true,
  },
  {
      title: 'Page 2',
      icon: 'home-outline',
      link: '/public/page2',
  },
  {
     title: 'Settings section',
     group: true,
  },
  {
    title: 'Settings',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
    ],
  },
];
