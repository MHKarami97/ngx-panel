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

export class MessageSelect {
  id: number;
  userFullName: number;
  text: string;
  time: string;
  isRead: boolean;
  isReadText: string;
}
