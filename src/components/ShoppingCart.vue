<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p >
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in cartStore.cartProducts" :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{cartStore.totalPrice }}</p>
    <p><button  @click="cartStore.checkout()">结算</button></p>
    <p v-show="cartStore.checkoutStatus">结算 {{ cartStore.checkoutStatus }}.</p>
  </div>
</template>

<script lang="ts">
import { useCartStore } from "../store/cart"

export default {
  setup () {
   const cartStore = useCartStore()
   console.log(cartStore);
   
  const checkout = () => {
    console.log(1);
    
  }

   return {
     cartStore
   }
  }
}
</script>
