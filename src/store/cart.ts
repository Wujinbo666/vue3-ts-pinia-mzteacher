import { defineStore } from "pinia";
import { buyProducts, IProduct } from "../api/shop";
import { useProductsStore } from './products'
//{id, title, price, quantity}
type CartProduct = {
    quantity: number
  } & Omit < IProduct, 'inventory' >

  export const useCartStore = defineStore('cart', {
    state: () => {
      return {
        cartProducts: [] as CartProduct[], //购物车商品列表
        checkoutStatus: null as null | string
      }
    },
    getters: {
      totalPrice(state) {
        return state.cartProducts.reduce((total,item)=>{
          return total + item.price * item.quantity
        }, 0)
      }
    },
    actions: {
      addProductToCart(product: IProduct) {
        console.log('addproductToCart', product);

        //看商品有没有库存
        if (product.inventory < 1) {
          return
        }
        //检查购物车中是否有该商品
        const cartItem = this.cartProducts.find(item => item.id === product.id)
        if (cartItem) {
          //如果有，让商品数量加1
          cartItem.quantity++
        } else {
          //如果没有则添加到购物车列表中
          this.cartProducts.push({
            ...product,
            quantity:1//第一次添加到购物车的数量是1
          })
        }
        //更新商品库存
        const productsStore = useProductsStore()
        productsStore.decrementProduct(product)
      },
      //结算
     async checkout() {
        const ret = await buyProducts()
        this.checkoutStatus = ret ? '成功' : '失败'; 
      }
    }
  })