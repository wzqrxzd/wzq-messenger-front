export interface Chat {
  chat_id: number;
  chat_name: string;
}

export interface Message {
  id: number,
  sender_id: number,
  content: string
}
