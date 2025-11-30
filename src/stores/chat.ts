import { defineStore } from "pinia";
import type { Message, Chat } from "@/types/chat";
import { reactive, ref } from "vue";

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([]);
  const messages = ref<Message[]>([]);
  const currentChat = reactive<Chat>({chat_id: 0, chat_name: ""});

  return {chats, messages, currentChat};
});

