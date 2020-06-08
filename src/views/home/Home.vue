<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlTop"
      class="tab-control"
      v-show="isTabFixed"/>
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad.once="swiperImageLoad"/>
      <home-recommend-view :recommend="recommend"/>
      <home-feature-view/>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="BackTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll'
  import tabControl from "components/content/tabControl/tabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeatureView from "./childComponents/HomeFeatureView";

  import {getHomeMultiData, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      tabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        scroll: null,
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      this.getHomeMultiData();

      // 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 500);

      // 监听图片加载完成事件
      this.$bus.$on('ImageLoad',() => {
        refresh();
      });

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
      /**
       * 请求数据
       */
      getHomeMultiData() {
        getHomeMultiData().then(result => {
          this.banner = result.data.banner.list;
          this.recommend = result.data.recommend.list;
        }).catch(error => {

        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;

        getHomeGoods(type, page).then(result => {
          this.goods[type].list.push(...result.data.list);

          this.goods[type].page += 1;
        }).catch(error => {
          alert(error);
        })
      },

      /**
       * Tab点击
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControlTop.currentIndex = index;
      },

      BackTopClick() {
        this.$refs.scroll.scrollTo(0,-605,300)
      },
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = position.y <= -1600;

        // 决定tabControl是否吸顶
        this.isTabFixed = position.y <= -this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;

    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
  }

  .scroll {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
