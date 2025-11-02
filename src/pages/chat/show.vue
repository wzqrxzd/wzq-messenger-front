<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useWsStore } from "@/stores/wsStore";
  import { useRoute } from 'vue-router'
  import { watch, computed, onMounted, ref } from 'vue';
  import { useChatStore } from '@/stores/chat';
  import axios from 'axios';
  import type { Message } from '@/types/chat';

  const ws = useWsStore();
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const route = useRoute()
  const chatId = computed(() => Number(route.params.id));

  const inputMessage = ref<string>();

  onMounted(()=>{
    getMessages(chatId.value);
  });

  watch(chatId, (newId) => {
    getMessages(newId);
  });

  const getMessages = function(chatId: number) {
     axios.get(`http://57.129.41.155:8080/chat/${chatId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
    }}).then(res => {
      console.log(res.data);
      chatStore.messages = res.data;
    })
  }

  const sendMessage = function() {
    axios.post("http://57.129.41.155:8080/send_message",
    {
      chat_id: chatId.value,
      content: inputMessage.value
    }, 
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
    }
    });
    inputMessage.value = "";
    console.log(`Bearer ${authStore.token}`
);
  }

  const mergedMessages = computed(() => {
    const wsMessages = ws.getMessages(chatId.value);
    const chatMessages = chatStore.messages;

    const wsOnly = wsMessages.filter(
      wsMsg => !chatMessages.some(chatMsg => chatMsg.message_id === wsMsg.message_id)
    );

    return [...chatMessages, ...wsOnly];
  });


</script>

<template>
  <div class="flex flex-col h-screen text-white">
    <div class="flex-1 overflow-y-auto pt-4 pl-4 pb-24">
      <div v-for="msg in mergedMessages" :key="msg.message_id" class="mb-4">
        <span class="border border-gray-600 p-1" >{{msg.sender_id}}: {{msg.content}}</span>
      </div>
    </div>
    <div class="flex gap-2 fixed w-full bottom-0 p-4 bg-zinc-900">
      <input v-model="inputMessage" class="p-4 w-1/2 bg-zinc-700 rounded-3xl text-left text-zinc-200 placeholder-zinc-400" type="text" placeholder="text"> </input>
      <button @click="sendMessage" class="p-4 w-1/10 h-full bg-zinc-700 rounded-3xl text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">Send</button>
    </div>
  </div>
</template>

<style scoped></style>
