<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetailData, Goods, Shop} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid;

      getDetailData(this.iid).then(resolve => {
        //获取轮播图信息
        this.topImages = resolve.result.itemInfo.topImages;

        //获取商品信息
        const data = resolve.result;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

      }).catch(reject => {
        alert(reject);
      });


    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
