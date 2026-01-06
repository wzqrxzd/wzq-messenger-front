<script setup lang="ts">
  import type { User } from '@/types/authentication';
  import { ref, reactive } from "vue";
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  import type { Token } from 'typescript';
  import { useRouter } from 'vue-router'

  defineOptions({
    name: 'Login',
  })
  
  const authStore = useAuthStore();
  const user = reactive<User>({username: "", password: ""});
  const router = useRouter()

  const isFailAuth = ref<boolean>(false);

  const login = function(user: User) {
    axios.post("http://57.129.41.155:8080/login", user).then(res => {
      authStore.token = res.data.token;
      authStore.userId = res.data.user_id;
      console.log(authStore.userId);
      console.log(authStore.token);
      authStore.isAuth = true;
      router.push({name: "chat.index"})
    }).catch( err => {
         authStore.isAuth = false;
        isFailAuth.value = true;
    }

    );
  }

  const redirectToRegister = function() {
    router.push({name: "auth.register"});
  }
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center min-h-screen bg-black">
    <div class="rounded-3xl w-1/4 bg-zinc-900 flex flex-col justify-between p-6 gap-4">
      <input v-model="user.username" class="p-4 w-full bg-zinc-700 rounded-3xl text-center text-zinc-200 placeholder-zinc-400" type="text" placeholder="username"> </input>
      <input v-model="user.password" class="p-4 w-full bg-zinc-700 rounded-3xl text-center text-zinc-200 placeholder-zinc-400" type="password" placeholder="password"> </input>

      <div class="w-full flex justify-center gap-4">
        <button @click="login(user)" class="p-4 w-[50%] h-full bg-zinc-700 rounded-3xl text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">Login</button>
        <button @click="redirectToRegister" class="p-4 w-[50%] h-full bg-zinc-700 rounded-3xl text-zinc-400 hover:bg-zinc-600 active:bg-zinc-500">Register</button>
      </div>
    </div>

    <div v-if="isFailAuth" class="rounded-3xl w-1/4 bg-zinc-900 flex flex-col">
      <div class="p-4 w-full text-red-500"> [ERROR] Wrong credentials </div>
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
