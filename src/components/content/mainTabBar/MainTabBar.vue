<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_click.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/sort">
      <img slot="item-icon" src="~assets/img/tabbar/sort.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/sort_click.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart">
      <img slot="item-icon" src="~assets/img/tabbar/shoppingCart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shoppingCart_click.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/my" activeColor="">
      <img slot="item-icon" src="~assets/img/tabbar/my.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/my_click.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/tabBar';
  import TabBarItem from 'components/common/tabbar/tabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
