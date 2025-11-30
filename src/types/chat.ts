export interface Chat {
  chat_id: number;
  chat_name: string;
}

export interface Message {
  message_id: number,
  sender_id: number,
  sender_name: string,
  content: string
}
