<script setup lang="ts">
  import ChatLayout from './layouts/ChatLayout.vue';
  import { useRoute } from "vue-router";
  import { computed } from 'vue';

  defineOptions({
    name: 'App',
  });

  const route = useRoute();

  const isChat = computed(() => {
    return route.name?.toString().startsWith("chat");
  });

</script>

<template>
  <div>
    <div v-if="isChat">
      <ChatLayout>
        <RouterView />
      </ChatLayout>
    </div>

    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
