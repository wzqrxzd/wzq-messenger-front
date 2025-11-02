import { defineStore } from "pinia";
import { ref } from "vue";
import type { Token } from "@/types/authentication";

export const useAuthStore = defineStore('auth', () => {
  const token = ref<Token>("");
  const isAuth = ref<boolean>(false);
  return {token, isAuth};
});
