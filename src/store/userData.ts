import { UserData, AuthForm } from '@/models/ts.model'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useUserDataStore = defineStore({
  id: 'userData',
  state: () => {
    return {
      isAuthorized: false as boolean,
      userData: {} as UserData,
    }
  },

  actions: {
    async submitAuthForm(authForm: AuthForm) {
      await axios
        .post('login', authForm, {
          headers: {
            'Content-Type': 'application/json',
          },

          withCredentials: true,
        })
        .then(function (res) {
          useUserDataStore().updateUserData(res.data.userData)
        })
        .catch(function (error) {
          console.log(error)
          throw error
        })
    },
    async logout() {
      await axios
        .get('logout', { withCredentials: true })
        .then(() => useUserDataStore().$reset())
        .then(() => {
          this.isAuthorized = false
          router.push({ path: 'login' })
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    updateUserData(userData: UserData) {
      if (!userData) return
      this.userData = userData
      this.isAuthorized = true
    },
  },
})
