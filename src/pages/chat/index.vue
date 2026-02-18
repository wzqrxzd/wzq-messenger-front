<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useWsStore } from "@/stores/wsStore";
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue';
  import { useServerStore } from '@/stores/serverStore';

  const serverStore = useServerStore();
  const authStore = useAuthStore();
  const ws = useWsStore();
  const router = useRouter();

//  onMounted(() => {
//    ws.connect(authStore.token);
//    serverStore.getUserInfo(authStore.userId);
//  })

</script>

<template>
  <div class="flex justify-center items-center text-white w-full h-full">
    <div class="text-zinc-600">
      No currently selected chat
    </div>
  </div>
</template>

<style scoped></style>
