<template>
  <div class="orders">
    <OrdersMainModal :pickedId="pickedId" @closeModal="isModalOpen = false" v-if="isModalOpen" />
    <div class="orders__table-row">
      <p class="orders__cell">№</p>
      <p class="orders__cell">Имя клиента</p>
      <div class="orders__cell">
        Адрес
        <div
          :class="{
            orders__sort_up: sortDirection.address === 'upSort',
            orders__sort_down: sortDirection.address === 'downSort',
          }"
          @click=";[(sortedBy = 'address'), sortTableBy()]"
          class="orders__sort"
        ></div>
      </div>
      <div class="orders__cell">
        Дата заказа
        <div
          :class="{
            orders__sort_up: sortDirection.dateTS === 'upSort',
            orders__sort_down: sortDirection.dateTS === 'downSort',
          }"
          @click=";[(sortedBy = 'dateTS'), sortTableBy()]"
          class="orders__sort"
        ></div>
      </div>
      <p class="orders__cell">Статус</p>
      <p class="orders__cell">Комментарий</p>
    </div>
    <div
      v-for="orderData in sortedOrders.orders"
      :key="orderData.id"
      class="orders__table-row"
      :class="{ 'orders__table-row_completed': orderData.isCompleted }"
    >
      <div v-if="userDataStore.userData.role === 'ADMIN'" class="orders__row-control">
        <button
          @click="completeOrder(orderData.id)"
          :class="{ 'orders__row-button_activated': orderData.isCompleted }"
          class="orders__row-button orders__row-button_check"
        ></button>
        <button @click="openModal(orderData.id)" class="orders__row-button"></button>
      </div>
      <p class="orders__cell">{{ orderData.id }}</p>
      <p class="orders__cell">{{ orderData.name }}</p>
      <p class="orders__cell orders__cell_address">{{ orderData.address }}</p>
      <p class="orders__cell">{{ dateToString(orderData.dateTS) }}</p>
      <p class="orders__cell">
        {{ orderData.isCompleted ? 'Выполнен' : 'Новый' }}
      </p>
      <p class="orders__cell">{{ orderData.comment }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrdersMainModal from '@/components/orders/OrdersMainModal.vue'
import { ref, onMounted, reactive, watch } from 'vue'
import { useordersDataStore } from '@/store/ordersData'
import { Order } from '@/models/ts.model'
import type { Ref } from 'vue'

import { useUserDataStore } from '@/store/userData'
const ordersDataStore = useordersDataStore()
const userDataStore = useUserDataStore()
let isModalOpen = ref(false)
let pickedId = ref(0)
let sortDirection = reactive({ address: 'noSort', dateTS: 'noSort', id: 'noSort' })
let sortedBy: Ref<'address' | 'dateTS' | 'id'> = ref('id')
onMounted(async () => {
  await ordersDataStore.fetchOrders().then(() => sortTableBy())
})
let sortedOrders = reactive({ orders: [] as Order[] })
async function completeOrder(id: number) {
  await ordersDataStore.completeOrder(id).then(() => ordersDataStore.fetchOrders())
}
function openModal(id: number) {
  pickedId.value = id
  isModalOpen.value = true
}
watch(ordersDataStore, async (updatedOrders) => {
  sortTableBy()
})
function dateToString(timestamp: number) {
  const date: Date = new Date(timestamp)
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
//columnName: 'address' | 'dateTS' | 'id'
function sortTableBy() {
  if (sortedBy.value === 'id') {
    sortedOrders.orders = ordersDataStore.orders
    return
  }

  if (sortedBy.value === 'dateTS') {
    sortDirection.address = 'noSort'

    switch (sortDirection.dateTS) {
      case 'noSort':
        sortDirection.dateTS = 'upSort'
        sortedOrders.orders = ordersDataStore.orders.slice().sort((a, b) => a.dateTS - b.dateTS)
        break

      case 'upSort':
        sortDirection.dateTS = 'downSort'
        sortedOrders.orders = ordersDataStore.orders
          .slice()
          .sort((a, b) => a.dateTS - b.dateTS)
          .reverse()
        break

      case 'downSort':
        sortDirection.dateTS = 'noSort'
        sortedOrders.orders = ordersDataStore.orders
        break
    }
    return
  }
  if (sortedBy.value === 'address') {
    sortDirection.dateTS = 'noSort'
    switch (sortDirection.address) {
      case 'noSort':
        sortDirection.address = 'upSort'
        sortedOrders.orders = ordersDataStore.orders
          .slice()
          .sort((a, b) => a.address.localeCompare(b.address))
        break

      case 'upSort':
        sortDirection.address = 'downSort'
        sortedOrders.orders = ordersDataStore.orders
          .slice()
          .sort((a, b) => a.address.localeCompare(b.address))
          .reverse()
        break

      case 'downSort':
        sortDirection.address = 'noSort'
        sortedOrders.orders = ordersDataStore.orders
        break
    }
    return
  }
}
</script>

<style lang="scss" scoped>
.orders {
  margin: 75px 0px 50px 21px;
  &__table-row {
    display: inline-grid;
    position: relative;
    grid-template-columns: 65px 126px 116px 143px 75px 151px;
    background: #d9d9d9;
    &:last-child {
      border-bottom: 1px solid black;
    }
    &_completed {
      background: #00cf5630;
      color: #1f1f1f;
    }
  }
  &__row-control {
    display: flex;
    position: absolute;
    top: 3px;
    right: 3px;
    gap: 0 6px;
  }
  &__row-button {
    z-index: 2;
    cursor: pointer;
    border: 1px solid black;
    background: url('@/assets/ico-svg/close.svg') no-repeat center / cover;
    width: 16px;
    height: 16px;
    &_check {
      background: url('@/assets/ico-svg/check.svg') no-repeat center / cover;
    }
    &_activated {
      cursor: default;
      border: 1px solid #11d100;
      &.orders__row-button_check {
        background: url('@/assets/ico-svg/check-active.svg') no-repeat center / cover;
      }
    }
  }
  &__sort {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background: url('@/assets/ico-svg/swap-vertical-bold.svg') no-repeat center / cover;
    width: 20px;
    height: 16px;
    &_down {
      background: url('@/assets/ico-svg/arrow-down-thick.svg') no-repeat center / cover;
    }
    &_up {
      background: url('@/assets/ico-svg/arrow-up-thick.svg') no-repeat center / cover;
    }
  }
  &__cell {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
    border-left: 1px solid black;

    padding: 10px 2px;
    text-align: center;
    word-break: break-all;

    &_address {
      font-size: 0.5rem;
    }

    &:last-child {
      border-right: 1px solid black;
    }
  }
}
</style>
