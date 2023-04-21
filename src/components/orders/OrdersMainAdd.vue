<template>
  <div class="add-order">
    <h3 class="add-order__title">Добавить заказ</h3>
    <form name="add" class="add-order__form" @submit.prevent="submitAddForm()">
      <input
        v-model="addForm.name"
        class="add-order__field"
        type="text"
        name="name"
        placeholder="Введите ваше имя"
        required
      />
      <input
        v-model="addForm.address"
        type="text"
        class="add-order__field"
        name="address"
        placeholder="Введите ваш адрес"
        required
      />
      <input
        v-model="addForm.comment"
        type="text"
        class="add-order__field"
        name="comment"
        placeholder="Комментарий"
      />
      <button type="submit" class="add-order__btn-submit">Добавить заказ</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import { useordersDataStore } from '@/store/ordersData'
import { useUserDataStore } from '@/store/userData'

import { AddForm } from '@/models/ts.model'
const ordersDataStore = useordersDataStore()
const userDataStore = useUserDataStore()

const emit = defineEmits(['changeDisplayedOrdersView'])

const addForm: AddForm = reactive({
  name: userDataStore.userData.name,
  address: '',
  comment: '',
  dateTS: 0,
  isCompleted: false,
  userName: userDataStore.userData.user,
})
async function submitAddForm() {
  await ordersDataStore
    .submitAddForm(addForm)
    .then(() => emit('changeDisplayedOrdersView', 'table'))
}
</script>
<style lang="scss" scoped>
.add-order {
  margin: 2rem 0px 0px 21px;
  max-width: 200px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    margin-top: 2rem;
  }
  &__field {
    background: #ffffff;
    padding-left: 0.5rem;
    width: 180px;
    height: 28px;
  }
  &__btn-submit {
    margin-top: 0.3rem;
    background: #d9d9d9;
    width: 115px;
    height: 25px;
  }
}
</style>
