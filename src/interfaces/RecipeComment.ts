import { IUser } from "./User";

interface IRecipeComment {
    _id?: string;
    desc: string;
    author: IUser
  }
  
  export type { IRecipeComment };
  