<script setup lang="ts">
  import type { User } from '@/types/authentication';
  import { ref, reactive } from "vue";
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router'
  import type { Token } from 'typescript';

  const isFailAuth = ref<boolean>(false);

  defineOptions({
    name: 'Login',
  })
  
  const authStore = useAuthStore();

  const user = reactive<User>({username: "", password: "", name: ""});

  const router = useRouter()

  const register = function(user: User) {
    axios.post("http://57.129.41.155:8080/register", user).then(res => {
      authStore.isAuth = true;
      authStore.token = res.data.token;
      authStore.userId = res.data.user_id;
      console.log(authStore.userId);
      console.log(authStore.token);
      authStore.isAuth = true;
      router.push({name: "chat.index"})

    }).catch( err => {
      console.log(err);
      authStore.isAuth = false;
      isFailAuth.value = true;
      Object.assign(user, {username: "", password: "", name: ""});
    });
  }

</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center min-h-screen bg-black">
    <div class="rounded-3xl w-1/4 bg-zinc-900 flex flex-col justify-between p-6 gap-4">

      <input v-model="user.name" class="p-4 w-full bg-zinc-700 rounded-3xl text-center text-zinc-200 placeholder-zinc-400" type="text" placeholder="username"> </input>
      <input v-model="user.username" class="p-4 w-full bg-zinc-700 rounded-3xl text-center text-zinc-200 placeholder-zinc-400" type="text" placeholder="username"> </input>
      <input v-model="user.password" class="p-4 w-full bg-zinc-700 rounded-3xl text-center text-zinc-200 placeholder-zinc-400" type="password" placeholder="password"> </input>

      <div class="w-full flex justify-start">
        <button @click="register(user)" class="p-4 w-[50%] h-full bg-zinc-700 rounded-3xl text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">Register</button>
      </div>
    </div>

    <div v-if="isFailAuth" class="rounded-3xl w-1/4 bg-zinc-900 flex flex-col">
      <div class="p-4 w-full text-red-500"> [ERROR] User already exists </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    outline: none;
  }

  input {
    caret-color: transparent;
  }
</style>
