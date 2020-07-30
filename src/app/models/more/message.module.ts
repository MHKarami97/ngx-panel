export class Message extends Base {
  text: string;
  time: string;
}

export class MessageCreate extends Base {
  userId: number;
  text: string;
}
