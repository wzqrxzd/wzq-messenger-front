import type { Message, Chat } from "@/types/chat";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useChatStore } from "./chat";

import { SERVER_URL } from "@/config/serverConfig";

interface WsMessage {
  type: string;
  [key: string]: any;
}

export const useWsStore = defineStore("ws", () => {
  const socket = ref<WebSocket | null>(null);
  const messagesByChat = reactive<Record<string, Message[]>>({});

  function connect(token: string) {
    if (socket.value) socket.value.close();

    socket.value = new WebSocket(`${SERVER_URL}/ws`);

    socket.value.onopen = () => {
      socket.value?.send(JSON.stringify({token}));
    };

    socket.value.onmessage = (event: MessageEvent) => { 
      const data: WsMessage = JSON.parse(event.data);
      console.log(data);
      if (data.type==="new_message") {
        addMessageToChat(data);
      } else if (data.type==="new_chat")
      {
        addChat(data);
      }
    };

    socket.value.onclose = (event: CloseEvent) => {
    };

    socket.value.onerror = (err: Event) => {
    };

    const addChat = function(data: WsMessage)
    {
      const chatStore = useChatStore();
      chatStore.chats.push({chat_id: data.chat_id, chat_name: data.chat_name});
    }

    const addMessageToChat = function(data: WsMessage)
    {
        if (!messagesByChat[data.chat_id])
        {
          messagesByChat[data.chat_id] = reactive<Message[]>([]);
        }

        const msg: Message = {
          message_id: data.message_id,
          sender_id: data.sender_id,
          sender_name: data.sender_name,
          content: data.content,
        };

        messagesByChat[data.chat_id].push(msg);
    }
  }

  function getMessages(chatId: number) {
    return messagesByChat[chatId] || [];
  }


  return {
    socket,
    messagesByChat,
    getMessages,
    connect,
  };
});
