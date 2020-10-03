export class Message {
  id: number;
  text: string;
  time: string;
}

export class MessageCreate {
  id: number;
  userId: number;
  text: string;
}
