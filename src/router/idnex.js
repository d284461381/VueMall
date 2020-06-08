import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('../views/home/Home');
const Sort = () => import('../views/sort/Sort');
const ShopCart = () => import('../views/shopcart/ShopCart');
const My = () => import('../views/my/My');
const Detail = () => import('../views/detail/Detail');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/sort',
    component: Sort
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/detail:iid',
    component: Detail
  }
];

const router = new VueRouter({
  routes,
  module: 'history'
});

export default router;
