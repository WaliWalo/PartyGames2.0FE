import { IUser } from './../user/types';
export interface IRoom {
  _id: string;
  users: Array<IUser>;
  roomType: string;
  ended: boolean;
  started: boolean;
  roomName: string;
}
