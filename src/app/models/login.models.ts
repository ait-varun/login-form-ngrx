export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}


export interface LoginUser {
  username: string;
  password: string;
}