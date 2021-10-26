import { IUser } from './../user/types';
export interface IMessage {
  _id: string;
  content: string;
  sender: IUser;
  notification?: boolean;
}
