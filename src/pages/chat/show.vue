<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useWsStore } from "@/stores/wsStore";
  import { useRoute } from 'vue-router'
  import { watch, computed, onMounted, ref } from 'vue';
  import { useChatStore } from '@/stores/chat';
  import type { Message } from '@/types/chat';
  import { useServerStore } from '@/stores/serverStore';

  onMounted(()=>{
    serverStore.getMessages(chatId.value);
  });

  const ws = useWsStore();
  const chatStore = useChatStore();
  const authStore = useAuthStore();

  const serverStore = useServerStore();
  const route = useRoute()

  const inputMessage = ref<string>();
  const messagesContainer = ref<HTMLElement | null>(null)

  const chatId = computed(() => Number(route.params.id));

  const mergedMessages = computed<Message[]>(() => {
    const wsMessages = ws.getMessages(chatId.value);
    const chatMessages = chatStore.messages;

    const wsOnly = wsMessages.filter(
      wsMsg => !chatMessages.some(chatMsg => chatMsg.message_id === wsMsg.message_id)
    );

    const merged = [...chatMessages, ...wsOnly];
    
    return merged;
  });

  const scrollToBottom = function() {
    const el = messagesContainer.value;
    if (el)
    {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }

  watch(mergedMessages, () => {
    setTimeout(scrollToBottom, 0);
  }, { deep: true });
  
  watch(chatId, (newId) => {
    serverStore.getMessages(newId);
  });

</script>

<template>
  <div class="flex flex-col h-screen text-white">
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4">
      <div v-for="msg in mergedMessages" :key="msg.message_id" :class="['flex mb-4', authStore.userId==msg.sender_id ? 'justify-end' : 'justify-start']">
        <span v-if="authStore.userId==msg.sender_id" class="border border-gray-700 bg-zinc-700 rounded-xl text-zinc-200 p-2" >{{msg.content}}</span>
        <span v-else class="border border-gray-600 bg-zinc-700 rounded-xl text-zinc-200 p-2" >{{msg.sender_name}}: {{msg.content}}</span> </div>
    </div>

    <div class="flex gap-2 sticky w-full bottom-0 justify-center pb-4 pr-4 pl-4">
      <input v-model="inputMessage" class="p-4 w-1/2 bg-zinc-700 rounded-3xl text-left text-zinc-200 placeholder-zinc-400" type="text" placeholder="text"> </input>
      <button @click="serverStore.sendMessage(chatId, inputMessage!), inputMessage=''" class="p-4 h-full bg-zinc-700 rounded-3xl text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
