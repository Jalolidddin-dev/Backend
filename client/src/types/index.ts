export interface ICard {
  _id: string;
  // title: string;
  describtion: string;
  // creadAt: string;
  body: string;
  // category: string;
  // author: string;
  picture: string;
}

export interface IUser {
  email: string;
  id: string;
}

export type AuthType = 'register' | 'login' | 'forgot-password';
