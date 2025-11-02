import type { Message } from "@/types/chat";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface WsMessage {
  type: string;
  [key: string]: any;
}

export const useWsStore = defineStore("ws", () => {
  const socket = ref<WebSocket | null>(null);
  const messagesByChat = reactive<Record<string, Message[]>>({});

  function connect(token: string) {
    if (socket.value) socket.value.close();

    socket.value = new WebSocket(`ws://zxc.sasavn.ru:8080/ws`);

    socket.value.onopen = () => {
      socket.value?.send(JSON.stringify({token}));
    };

    socket.value.onmessage = (event: MessageEvent) => { 
      const data: WsMessage = JSON.parse(event.data);
      if (data.type==="new_message") {
        addMessageToChat(data);
      }
    };

    socket.value.onclose = (event: CloseEvent) => {
    };

    socket.value.onerror = (err: Event) => {
    };

    const addMessageToChat = function(data: WsMessage)
    {
        if (!messagesByChat[data.chat_id])
        {
          messagesByChat[data.chat_id] = reactive<Message[]>([]);
        }

        const msg: Message = {
          id: data.message_id,
          sender_id: data.sender_id,
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
