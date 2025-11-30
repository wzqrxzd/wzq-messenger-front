import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Token } from "@/types/authentication";
import type { User } from "@/types/user";

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({userId: 0, name: "", username: "", description: ""});
  return { user };
});
