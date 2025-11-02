export interface Chat {
  chat_id: number;
  chat_name: string;
}

export interface Message {
  chat_id: number,
  id: number,
  sender_id: number,
  content: string
}
