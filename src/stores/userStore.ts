import { defineStore } from "pinia";
import { reactive } from "vue";
import type { User } from "@/types/user";
import { useAuthStore } from "./auth";
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({userId: 0, name: "", username: "", description: ""});

  function getUserInfo(userId: number) {
    const authStore = useAuthStore();
    axios.get(`http://57.129.41.155:8080/user/${userId}`, 
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    ).then(res => {
      console.log(userId);
      console.log(res.data);
      user.value = res.data; 
    }).catch(err => {
      console.error(err);
    });
  }

  return { user, getUserInfo };
});
