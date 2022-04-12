<template>
  <ul>
    <li v-for="item in productStore.all" >
      {{ item.title }}-{{ item.price }}
      <br />
      <button :disabled="!item.inventory" @click="cartStore.addProductToCart(item)">添加到购物车</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { useProductsStore } from "../store/products"
import { useCartStore } from '../store/cart'

export default {
  setup() {
    const productStore = useProductsStore()
    const cartStore = useCartStore()
    productStore.loadAllProducts()

    return {
      productStore,
      cartStore
    }
  }
}
</script>
