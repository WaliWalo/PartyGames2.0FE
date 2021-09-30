export interface IUser {
  _id: string;
  score: number;
  name: string;
  creator: boolean;
  turn: boolean;
  createdAt: Date;
  updatedAt: Date;
  answer: string;
  socketId: string;
}
