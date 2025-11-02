import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface WsMessage {
  type?: string;
  chat_id?: number;
  message_id?: number;
  sender_id?: number;
  content?: string;
  [key: string]: any;
}

export const useWsStore = defineStore("ws", () => {
  const socket = ref<WebSocket | null>(null);
  const messagesByChat = reactive<Record<number, WsMessage[]>>({}); // <-- ключ: chat_id
  const rawLogs = reactive<string[]>([]);

  function log(msg: string) {
    rawLogs.push(msg);
    console.log(msg);
  }

  function connect(token: string) {
    if (socket.value) socket.value.close();

    socket.value = new WebSocket(`ws://zxc.sasavn.ru:8080/ws`);

    socket.value.onopen = () => {
      log("[WS] Connected");
      socket.value?.send(JSON.stringify({ token }));
      log("[WS] Sent auth token");
    };

    socket.value.onmessage = (event: MessageEvent) => {
      log(`[WS] Raw message: ${event.data}`);
      try {
        const data: WsMessage = JSON.parse(event.data);
        log(`[WS] Parsed: ${JSON.stringify(data)}`);

        if (data.type === "new_message" && data.chat_id) {
          addMessageToChat(data.chat_id, data);
        }
      } catch (e) {
        log(`[WS] Parse error: ${(e as Error).message}`);
      }
    };

    socket.value.onclose = (event: CloseEvent) => {
      log(`[WS] Closed: code=${event.code} reason=${event.reason}`);
    };

    socket.value.onerror = (err: Event) => {
      log(`[WS] Error: ${err}`);
    };
  }

  function addMessageToChat(chatId: number, msg: WsMessage) {
    if (!messagesByChat[chatId]) {
      messagesByChat[chatId] = reactive([]); // создаём массив, если его ещё нет
    }

    // проверка на дубликаты (по message_id)
    const exists = messagesByChat[chatId].some(m => m.message_id === msg.message_id);
    if (!exists) {
      messagesByChat[chatId].push(msg);
    }
  }

  function getMessages(chatId: number) {
    return messagesByChat[chatId] || [];
  }

  return {
    socket,
    messagesByChat,
    rawLogs,
    connect,
    getMessages,
  };
});
