<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import axios from 'axios';
  import { useChatStore } from '@/stores/chat';

  defineOptions({
    name: "ChatLayout"
  });

  onMounted(()=>{
    getChats();
  });

  const authStore = useAuthStore();
  const chatStore = useChatStore();

  const getChats = function() {
    axios.get("http://57.129.41.155:8080/chats", 
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    ).then(res => {
      chatStore.chats = res.data; 
    }).catch(err => {
      console.error(err);
    });
  };
</script>

<template>
  <div>
    <section class="flex">
      <aside class="bg-zinc-900 w-1/4 text-white min-h-screen">
        <div v-for="chat in chatStore.chats">
          <div class="block p-4 border-b border-zinc-700 text-gray-200">
            <router-link :to="{name: 'chat.show', params: {id: chat.chat_id}}"> {{chat.chat_name}} id:{{chat.chat_id}} </router-link>
          </div>
        </div>
      </aside>
      <article class="bg-zinc-800 w-3/4 p-4">
        <slot />
      </article>
    </section>
  </div>
</template>

<style scoped>
</style>
