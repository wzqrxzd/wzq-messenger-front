<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import { useServerStore } from '@/stores/serverStore';
  import { useChatStore } from '@/stores/chat';
  import type { Chat } from '@/types/chat';
  import type { User } from "@/types/user";
  import router from '@/router';
  import { useAuthStore } from '@/stores/auth';
  import { useUserStore } from '@/stores/userStore';

  defineOptions({
    name: "ChatLayout"
  });

  const serverStore = useServerStore();
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const modalToggle = ref<boolean>(false);
  const createChatToggle = ref<boolean>(false);

  const newChatUser = ref<string>("");
  const newUserData = reactive<User>(userStore.user);

  const onOpen = function(chat: Chat) {
    chatStore.currentChat = chat;
    router.push({ name: 'chat.show', params: { id: chat.chat_id } })
  }

  onMounted(()=>{
    serverStore.getChats();
  });
</script>

<template>
  <div>
    <section class="flex">
      <div @click="modalToggle=false, createChatToggle=false" class="modal-shadow" v-if="modalToggle">
        <div v-if="createChatToggle" @click.stop class="modal bg-zinc-800 rounded-xl border border-zinc-400">
          <div class="flex flex-col p-4 gap-4 text-zinc-400">
            <div class="flex justify-between">
              <span class="p-2"> Username: </span>
              <input v-model="newChatUser" type="text" placeholder="name" class="p-2 w-1/2 rounded-xl border border-zinc-600"></input>
            </div>
            <div class="flex justify-center">
              <button @click="serverStore.createChat(newChatUser)" class="p-4 w-full h-full bg-zinc-700 rounded-3xl bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">
                Create
              </button>
            </div>
          </div>
        </div>
        <div v-else @click.stop class="modal bg-zinc-800 rounded-xl border border-zinc-400">
          <div class="flex flex-col p-4 gap-4 text-zinc-400">
            <div class="flex justify-between">
              <span class="p-2"> Name: </span>
              <input v-model="newUserData.name"  type="text" placeholder="..." class="p-2 w-1/2 rounded-xl border border-zinc-600"></input>
            </div>
            <div class="flex justify-between">
              <span class="p-2"> Username: </span>
              <input v-model="newUserData.username" type="text" placeholder="..." class="p-2 w-1/2 rounded-xl border border-zinc-600"></input>
            </div>
            <div class="flex justify-between">
              <span class="p-2"> Description: </span>
              <input v-model="newUserData.description" type="text" placeholder="..." class="p-2 w-1/2 rounded-xl border border-zinc-600"></input>
            </div>
            <div class="flex justify-center">
              <button class="p-4 w-full h-full bg-zinc-700 rounded-3xl bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <aside class="bg-zinc-900 w-1/4 text-white h-screen flex flex-col">
        <div class="sticky top-0 border-b border-zinc-700 text-gray-200 bg-black p-4 flex justify-between">
          <svg @click="modalToggle=true, createChatToggle=true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>


          <svg @click="modalToggle = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-for="chat in chatStore.chats">
            <div @click="onOpen(chat)" :class="[chat===chatStore.currentChat ? 'bg-zinc-500' : '', 'block p-4 border-b border-zinc-700 text-gray-200 cursor-pointer']">
              <div> {{chat.chat_name}} id:{{chat.chat_id}} </div>
            </div>
          </div>
        </div>
      </aside>
      <article class="bg-zinc-800 w-3/4">
        <slot />
      </article>
    </section>
  </div>
</template>

<style scoped>
.modal-shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  width: 50%;
}
</style>
