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

  onMounted(() => {
    console.log("init");
    if (!authStore.isAuth)
    {
      router.push({name: "auth.login"})
      return;
    }

    ws.connect(authStore.token);
    serverStore.getUserInfo(authStore.userId);
  })

</script>

<template>
  <div class="text-white">
    Index
  </div>
</template>

<style scoped></style>
