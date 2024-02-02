interface IUser {
    email: string;
    password: string;
    status?: string;
    accessToken?: string;
    refreshToken?: string;
  }
  
  export type { IUser };
  