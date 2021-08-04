export interface IRoom {
  _id: string;
  users: Array<string>;
  roomType: string;
  ended: boolean;
  started: boolean;
  roomName: string;
}
