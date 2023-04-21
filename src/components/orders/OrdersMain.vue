<template>
  <OrdersMainHeader
    @changeDisplayedOrdersView="(newDisplayedView) => changeDisplayedOrdersView(newDisplayedView)"
  />
  <div class="container">
    <OrdersMainTableAll v-if="displayedOrdersView === 'table'" />
    <OrdersMainAdd
      v-else-if="displayedOrdersView === 'add'"
      @changeDisplayedOrdersView="(newDisplayedView) => changeDisplayedOrdersView(newDisplayedView)"
    />
  </div>
</template>

<script setup lang="ts">
import OrdersMainHeader from '@/components/orders/OrdersMainHeader.vue'
import OrdersMainTableAll from '@/components/orders/OrdersMainTableAll.vue'
import OrdersMainAdd from '@/components/orders/OrdersMainAdd.vue'
type DisplayedOrdersView = Ref<'table' | 'add'>
import type { Ref } from 'vue'

import { ref } from 'vue'
let displayedOrdersView: DisplayedOrdersView = ref('table')

function changeDisplayedOrdersView(newDisplayedView: 'table' | 'add') {
  displayedOrdersView.value = newDisplayedView
  console.log(displayedOrdersView)
}
</script>
<style lang="scss" scoped></style>
