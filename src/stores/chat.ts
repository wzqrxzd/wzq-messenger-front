import { defineStore } from "pinia";
import { Message, type Chat } from "@/types/chat";
import { reactive, ref } from "vue";

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([]);
  const currentChat = reactive<Chat>({chat_id: 0, chat_name: ""});
  const messages = ref<Message[]>([]);

  return {chats, currentChat};
});

