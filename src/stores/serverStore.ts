import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./auth";
import { useChatStore } from '@/stores/chat';
import { useUserStore } from "./userStore";
import { ref } from "vue";

export const useServerStore = defineStore('server', () => {
    function getChats() {
      const authStore = useAuthStore();
      const chatStore = useChatStore();
      axios.get("http://57.129.41.155:8080/chats", 
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }
      ).then(res => {
        chatStore.chats = res.data; 
      }).catch(err => {
        console.error(err);
    });
  };

  function getMessages(chatId: number)
  {
    const authStore = useAuthStore();
    const chatStore = useChatStore();
     axios.get(`http://57.129.41.155:8080/chats/${chatId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
    }}).then(res => {
      console.log(res.data);
      chatStore.messages = res.data;
    })

  }

  function sendMessage(chatId: number, content: string) {
    const authStore = useAuthStore();
    axios.post(`http://57.129.41.155:8080/chats/${chatId}/messages`,
    {
      content: content
    }, 
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
    }
    });
    console.log(`Bearer ${authStore.token}`);

  }

  function createChat(username: string) {
    const authStore = useAuthStore();
    let id: number = 0;
    axios.post(`http://57.129.41.155:8080/chats`,
      {
        name: username,
        username: username
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    ).then(res => {
      console.log(res);
      // id = res.data.chat_id;
      // console.log(id);
      // axios.post(`http://57.129.41.155:8080/chats/${id}/add_user`,
      // {
      //   username: username
      // },
      // {
      //   headers: {
      //     Authorization: `Bearer ${authStore.token}`
      //   }
      }
    )
  }

  function getUserInfo(userId: number) {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    axios.get(`http://57.129.41.155:8080/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
    }
    }).then(res => {
      console.log(res.data);
      Object.assign(userStore.user, {userId:userId, name:res.data.name, username:res.data.username, description:res.data.description});
    });
  }

  return {getChats, getMessages, getUserInfo, sendMessage, createChat};
});
