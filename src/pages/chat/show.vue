<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useWsStore } from '@/stores/wsStore';
  import { useRoute } from 'vue-router'
  import { computed } from 'vue';
  import { useChatStore } from '@/stores/chat';

  const ws = useWsStore();
  const chatStore = useChatStore();
  const route = useRoute()
  const chatId = computed(() => Number(route.params.id))


</script>

<template>
  <div class="text-white">
    {{ws.getMessages(chatId)}}
  </div>
</template>

<style scoped></style>
