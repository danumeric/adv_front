<template>
  <div class="modal">
    <p class="modal__text">Вы действительно хотите удалить заказ?</p>
    <div class="modal__control">
      <button @click="deleteOrder(pickedId)" class="modal__button">Ок</button>
      <button @click="$emit('closeModal')" class="modal__button">Отмена</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import { useordersDataStore } from '@/store/ordersData'
defineProps(['pickedId'])
const emit = defineEmits(['closeModal'])

const ordersDataStore = useordersDataStore()

async function deleteOrder(id: number) {
  await ordersDataStore.deleteOrder(id).then(() => {
    ordersDataStore.fetchOrders()
    emit('closeModal')
  })
}
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: #e2e1e1;
  width: 335px;
  height: 215px;
  &__control {
    display: flex;
    gap: 0 55px;
    margin-top: 5.5rem;
  }
  &__button {
    background: #ffffff;
    width: 78px;
    height: 27px;
  }
}
</style>
