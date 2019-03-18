import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/**
 * renderNav: 是否渲染路由名字到面包屑导航，默认true
 * hidden: 是否不渲染到导航菜单，默认false
 */
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: resolve => require(['@/pages/login.vue'], resolve),
      meta: { title: '登录' }
    },
    { path: '/', name: '/', redirect: '/login', hidden: true, meta: {} },
    {
      path: '/home',
      name: 'home',
      redirect: '/foodMange',
      component: resolve => require(['@/layout/home.vue'], resolve),
      meta: { title: 'home', renderNav: false },
      children: [
        // {
        //   path: '/dashboard',
        //   name: 'dashboard',
        //   component: resolve => require(['@/pages/dashboard.vue'], resolve),
        //   meta: { title: '首页', ico: 'icon-wxbzhuye' }
        // },
        {
          path: '/foodMange',
          name: 'foodMange',
          meta: { title: '菜单管理', ico: 'icon-all' },
          component: resolve => require(['@/layout/main.vue'], resolve),
          children: [
            {
              path: '/foodList',
              name: 'foodList',
              component: resolve => require(['@/pages/foodMange/foodMange.vue'], resolve),
              meta: { title: '菜单列表' }
            },
            {
              path: '/categoriesList',
              name: 'categoriesList',
              component: resolve => require(['@/pages/foodMange/categories.vue'], resolve),
              meta: { title: '分类列表' }
            }
          ]
        },
        {
          path: '/adminMange',
          name: 'adminMange',
          meta: { title: '管理员管理', ico: 'icon-guanliyuan' },
          component: resolve => require(['@/layout/main.vue'], resolve),
          children: [
            {
              path: '/adminList',
              name: 'adminList',
              component: resolve => require(['@/pages/adminMange/adminList.vue'], resolve),
              meta: { title: '管理员列表' }
            }
          ]
        },
        {
          path: '/deskMange',
          name: 'deskMange',
          meta: { title: '座位管理', ico: 'icon-zhuozi' },
          component: resolve => require(['@/layout/main.vue'], resolve),
          children: [
            {
              path: '/deskList',
              name: 'deskList',
              component: resolve => require(['@/pages/desk/deskMange.vue'], resolve),
              meta: { title: '座位列表' }
            }
          ]
        },
        {
          path: '/orderMange',
          name: 'orderMange',
          meta: { title: '订单列表', ico: 'icon-order_icon' },
          component: resolve => require(['@/layout/main.vue'], resolve),
          children: [
            {
              path: '/orderList',
              name: 'orderList',
              component: resolve => require(['@/pages/order/orderList.vue'], resolve),
              meta: { title: '订单列表' }
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: resolve => require(['@/pages/404.vue'], resolve),
      meta: { title: '404' }
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
});
