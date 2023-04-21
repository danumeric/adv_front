<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__control">
        <button class="header__orders-btn" @click="$emit('changeDisplayedOrdersView', 'table')">
          Все заказы
        </button>
        <button @click="$emit('changeDisplayedOrdersView', 'add')" class="header__orders-btn">
          Добавить заказ
        </button>
      </div>
      <p class="header__user-name">{{ userDataStore.userData?.name }}</p>
      <button @click="logout" class="header__exit-btn">Выйти</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'
import axios from 'axios'
import router from '@/router'
const userDataStore = useUserDataStore()
function logout() {
  axios
    .get('logout', { withCredentials: true })
    .then(() => userDataStore.$reset())
    .then(() => {
      router.push({ path: 'login' })
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>
<style lang="scss" scoped>
.header {
  background: #165996;
  height: 52px;
  &__container {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__control {
    flex: 1 0;
  }
  &__orders-btn {
    color: #ffffff;
    &:hover {
      text-shadow: 0px 0px 1px rgb(207, 205, 205), 0 0 25px rgb(191, 191, 192);
    }
    &:last-child {
      margin-left: 2.375rem;
    }
  }
  &__user-name {
    margin-right: 1.75rem;
  }
  &__exit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d9d9d9;
    width: 78px;
    height: 27px;
    &:hover {
      background: #bfbfbf;
    }
  }
}
</style>
