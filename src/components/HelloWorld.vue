<template lang="">
  <div>
    {{mainStore.count}}
    {{mainStore.foo}}
    <br />
    解构并带有响应式：
    {{count}}
    {{foo}}
    <br/>
    getters： 和computed一样具有缓存功能：
    {{mainStore.count10}}
    {{mainStore.count10}}
    {{mainStore.count10}}
    <button @click="handChangeState">加加</button>
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '../store'
  // import { toRefs } from 'vue'
  const mainStore = useMainStore()

  // 想解构出来也是响应式，可使用容器的storeToRefs，此处自己测验toRefs依然可用
  const { count, foo } = storeToRefs(mainStore)
  const add = () => {
    mainStore.count++
  }
  const handChangeState = () => {
    /**
     * 方式1.最简单的方式
     */
    // mainStore.count++
    // mainStore.foo = 'hello'

    /**
     * 方式2.可批量修改，性能优化
     */
    // mainStore.$patch({
    //   count: mainStore.count + 1,
    //   foo: 'hello'
    // })

    /**
     * 方式3.更好地可批量修改方式，$patch一个函数 
     */
    // mainStore.$patch(state => {
    //   state.count++
    //   state.foo = 'hello'
    // })

    /**
     * 方式4.逻辑比较多得时候， 可以封装到actions中做处理
     */
    mainStore.changeState(10)

  }
</script>

<style lang="">

</style>