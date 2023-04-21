import { AddForm, Order } from '@/models/ts.model'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { useUserDataStore } from '@/store/userData'

export const useordersDataStore = defineStore({
  id: 'ordersData',
  state: () => {
    return {
      orders: [] as Order[],
    }
  },
  getters: {
    // automatically infers the return type as a number
  },
  actions: {
    async fetchOrders() {
      await axios
        .get('orders', { withCredentials: true })
        .then(function (res) {
          useordersDataStore().updateOrders(res.data.orders)
        })
        .catch(function (e) {
          console.log(e)
          router.push({ path: 'login' })
        })
    },
    async completeOrder(id: number) {
      await axios
        .patch(
          'complete-order',
          { id },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then(function (res) {
          if (res.status === 201) {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    async deleteOrder(id: number) {
      await axios
        .delete('delete-order', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            id,
          },
          withCredentials: true,
        })
        .then(function (res) {
          if (res.status === 201) {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    async submitAddForm(addForm: AddForm) {
      const date: Date = new Date()

      addForm.dateTS = +date
      addForm.userName = useUserDataStore().userData.user

      await axios
        .post('add-order', addForm, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then(function (res) {
          if (res.status === 201) {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    updateOrders(orders: Order[]) {
      this.orders = orders
    },
  },
})
