import { defineStore } from 'pinia'
//1、定义并导出容器
// 参数1： 容器的ID， 必须唯一，将来pinia会把所有容器挂载到跟容器
// 参数2： 选项对象
// 返回值： 一个函数，调用得到容器实例
export const useMainStore = defineStore('main', {
  /**
   * 类似组件的 data，用来储存全局状态
   * 1、必须是函数，， 这样是为了在服务器端渲染的时候避免交叉请求导致的数据状态污染
   * 2.必须是箭头函数，为了更好地TS类型推导
   */
  state: () => {
    return {
      count:100,
      foo:'2',
      arr:[1,2,3]
    }
  },
   /**
   * 类似组件的computed，用来封装计算属性，有缓存的功能,调用多次只计算一次
   */
  getters: {
    //函数接收一个可选参数： state状态对象
    // count10 (state) {
    //   console.log('count10 调用了');
    //   return state.count + 10
    // }

    //如果 getters 中使用了 this 则必须手动指定返回值的类型，否则ts类型推到不出来
    count10 ():number {
      console.log('count10 调用了');
      return this.count + 10
    }
  },
   /**
   * 类似于methods,封装业务逻辑， 修改state
   */
  actions: {
    // 不能使用箭头函数定义action
    changeState (num: number) {
      this.count += num
      this.foo = 'hello'
      this.arr.push(4)

      // 还可以使用如下方式修改
      //this.$patch({})
      //this.$patch(state => {})
    }
  }
})
//2、使用容器中的state

//3、修改state

//4、容器中action的使用