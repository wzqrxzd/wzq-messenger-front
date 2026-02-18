import { defineStore } from "pinia";
import { reactive } from "vue";
import type { User } from "@/types/user";
import { useAuthStore } from "./auth";
import { SERVER_URL } from "@/config/serverConfig";
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({userId: 0, name: "", username: "", description: ""});

  function getUserInfo(userId: number) {
    const authStore = useAuthStore();
    axios.post(`${SERVER_URL}/user`,
      {
        id: Number(userId)
      },
      {
        headers: {
        Authorization: `Bearer ${authStore.token}`
        }
      }).then(res => {
      console.log(userId);
      console.log(res.data);
      user.value = res.data; 
    }).catch(err => {
      console.error(err);
    });
  }

  return { user, getUserInfo };
});
