<template>
  <!-- <AuthorisationMain v-if="!isAuthorized" /> -->
  <OrdersMain v-if="userDataStore.isAuthorized" />
</template>

<script setup lang="ts">
import AuthorisationMain from '@/components/authorisation/AuthorisationMain.vue'
import OrdersMain from '@/components/orders/OrdersMain.vue'
import router from '@/router'

import { onMounted } from 'vue'
import { useUserDataStore } from '@/store/userData'

// let isAuthorized = ref(false)
const userDataStore = useUserDataStore()
onMounted(() => {
  if (!userDataStore.isAuthorized) {
    router.push({ path: 'login' })
  }
})
</script>
