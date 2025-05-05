import App from "../App.vue";
import { createRouter, createWebHashHistory, createWebHistory, RouterScrollBehavior } from "vue-router";
import { defineAsyncComponent } from "vue";
import {routerMode} from '../config/env'

const home = defineAsyncComponent(
  () => import(/* webpackChunkName: "home" */ "../page/home/home.vue")
);
const city = defineAsyncComponent(
  () => import(/* webpackChunkName: "city" */ "../page/city/city.vue")
);
const msite = defineAsyncComponent(
  () => import(/* webpackChunkName: "msite" */ "../page/msite/msite.vue")
);
const search = defineAsyncComponent(
  () => import(/* webpackChunkName: "search" */ "../page/search/search.vue")
);
const shop = defineAsyncComponent(
  () => import(/* webpackChunkName: "shop" */ "../page/shop/shop.vue")
);
const login = defineAsyncComponent(
  () => import(/* webpackChunkName: "login" */ "../page/login/login.vue")
);
const profile = defineAsyncComponent(
  () => import(/* webpackChunkName: "profile" */ "../page/profile/profile.vue")
);
const forget = defineAsyncComponent(
  () => import(/* webpackChunkName: "forget" */ "../page/forget/forget.vue")
);
const order = defineAsyncComponent(
  () => import(/* webpackChunkName: "order" */ "../page/order/order.vue")
);
const orderDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "order-detail" */ "../page/order/children/orderDetail.vue"
    )
);
const vipcard = defineAsyncComponent(
  () => import(/* webpackChunkName: "vipcard" */ "../page/vipcard/vipcard.vue")
);
const invoiceRecord = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "invoice-record" */ "../page/vipcard/children/invoiceRecord.vue"
    )
);
const useCart = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "use-cart" */ "../page/vipcard/children/useCart.vue"
    )
);
const vipDescription = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "vip-description" */ "../page/vipcard/children/vipDescription.vue"
    )
);
const food = defineAsyncComponent(
  () => import(/* webpackChunkName: "food" */ "../page/food/food.vue")
);
const confirmOrder = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "confirm-order" */ "../page/confirmOrder/confirmOrder.vue"
    )
);
const remark = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "remark" */ "../page/confirmOrder/children/remark.vue"
    )
);
const payment = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "payment" */ "../page/confirmOrder/children/payment.vue"
    )
);
const userValidation = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "user-validation" */ "../page/confirmOrder/children/userValidation.vue"
    )
);
const invoice = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "invoice" */ "../page/confirmOrder/children/invoice.vue"
    )
);
const chooseAddress = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "choose-address" */ "../page/confirmOrder/children/chooseAddress.vue"
    )
);
const addAddress = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "add-address" */ "../page/confirmOrder/children/children/addAddress.vue"
    )
);
const searchAddress = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "search-address" */ "../page/confirmOrder/children/children/children/searchAddress.vue"
    )
);
const foodDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "food-detail" */ "../page/shop/children/foodDetail.vue"
    )
);
const shopDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "shop-detail" */ "../page/shop/children/shopDetail.vue"
    )
);
const shopSafe = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "shop-safe" */ "../page/shop/children/children/shopSafe.vue"
    )
);
const info = defineAsyncComponent(
  () =>
    import(/* webpackChunkName: "info" */ "../page/profile/children/info.vue")
);
const setusername = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "set-username" */ "../page/profile/children/children/setusername.vue"
    )
);
const address = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "address" */ "../page/profile/children/children/address.vue"
    )
);
const add = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "add" */ "../page/profile/children/children/children/add.vue"
    )
);
const addDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "add-detail" */ "../page/profile/children/children/children/children/addDetail.vue"
    )
);
const balance = defineAsyncComponent(
  () => import(/* webpackChunkName: "balance" */ "../page/balance/balance.vue")
);
const balanceDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "balance-detail" */ "../page/balance/children/detail.vue"
    )
);
const benefit = defineAsyncComponent(
  () => import(/* webpackChunkName: "benefit" */ "../page/benefit/benefit.vue")
);
const coupon = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "coupon" */ "../page/benefit/children/coupon.vue"
    )
);
const hbDescription = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "hb-description" */ "../page/benefit/children/hbDescription.vue"
    )
);
const hbHistory = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "hb-history" */ "../page/benefit/children/hbHistory.vue"
    )
);
const exchange = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "exchange" */ "../page/benefit/children/exchange.vue"
    )
);
const commend = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "commend" */ "../page/benefit/children/commend.vue"
    )
);
const points = defineAsyncComponent(
  () => import(/* webpackChunkName: "points" */ "../page/points/points.vue")
);
const pointsDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "points-detail" */ "../page/points/children/detail.vue"
    )
);
const service = defineAsyncComponent(
  () => import(/* webpackChunkName: "service" */ "../page/service/service.vue")
);
const questionDetail = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "question-detail" */ "../page/service/children/questionDetail.vue"
    )
);
const find = defineAsyncComponent(
  () => import(/* webpackChunkName: "find" */ "../page/find/find.vue")
);
const download = defineAsyncComponent(
  () =>
    import(/* webpackChunkName: "download" */ "../page/download/download.vue")
);

export default createRouter({
  history: routerMode === "hash" ? createWebHashHistory() : createWebHistory(),
  strict: process.env.NODE_ENV !== "production",
  scrollBehavior: ((to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }) as RouterScrollBehavior,
  routes: [
    {
      path: "/",
      component: App, //顶层路由，对应index.html
      children: [
        //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
          path: "",
          redirect: "/home",
        },
        //首页城市列表页
        {
          path: "/home",
          component: home,
        },
        //当前选择城市页
        {
          path: "/city/:cityid",
          component: city,
        },
        //所有商铺列表页
        {
          path: "/msite",
          component: msite,
          meta: { keepAlive: true },
        },
        //特色商铺列表页
        {
          path: "/food",
          component: food,
        },
        //搜索页
        {
          path: "/search/:geohash",
          component: search,
        },
        //商铺详情页
        {
          path: "/shop",
          component: shop,
          children: [
            {
              path: "foodDetail", //食品详情页
              component: foodDetail,
            },
            {
              path: "shopDetail", //商铺详情页
              component: shopDetail,
              children: [
                {
                  path: "shopSafe", //商铺安全认证页
                  component: shopSafe,
                },
              ],
            },
          ],
        },
        //确认订单页
        {
          path: "/confirmOrder",
          component: confirmOrder,
          children: [
            {
              path: "remark", //订单备注
              component: remark,
            },
            {
              path: "invoice", //发票抬头
              component: invoice,
            },
            {
              path: "payment", //付款页面
              component: payment,
            },
            {
              path: "userValidation", //用户验证
              component: userValidation,
            },
            {
              path: "chooseAddress", //选择地址
              component: chooseAddress,
              children: [
                {
                  path: "addAddress", //添加地址
                  component: addAddress,
                  children: [
                    {
                      path: "searchAddress", //搜索地址
                      component: searchAddress,
                    },
                  ],
                },
              ],
            },
          ],
        },
        //登录注册页
        {
          path: "/login",
          component: login,
        },
        //个人信息页
        {
          path: "/profile",
          component: profile,
          children: [
            {
              path: "info", //个人信息详情页
              component: info,
              children: [
                {
                  path: "setusername",
                  component: setusername,
                },
                {
                  path: "address",
                  component: address, //编辑地址
                  children: [
                    {
                      path: "add",
                      component: add,
                      children: [
                        {
                          path: "addDetail",
                          component: addDetail,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              path: "service", //服务中心
              component: service,
            },
          ],
        },
        //修改密码页
        {
          path: "/forget",
          component: forget,
        },
        //订单列表页
        {
          path: "/order",
          component: order,
          children: [
            {
              path: "orderDetail", //订单详情页
              component: orderDetail,
            },
          ],
        },
        //vip卡页
        {
          path: "/vipcard",
          component: vipcard,
          children: [
            {
              path: "invoiceRecord", //开发票
              component: invoiceRecord,
            },
            {
              path: "useCart", //购买会员卡
              component: useCart,
            },
            {
              path: "vipDescription", //会员说明
              component: vipDescription,
            },
          ],
        },
        //发现页
        {
          path: "/find",
          component: find,
        },
        //下载页
        {
          path: "/download",
          component: download,
        },
        //服务中心
        {
          path: "/service",
          component: service,
          children: [
            {
              path: "questionDetail", //订单详情页
              component: questionDetail,
            },
          ],
        },
        //余额
        {
          path: "balance",
          component: balance,
          children: [
            {
              path: "detail", //余额说明
              component: balanceDetail,
            },
          ],
        },
        //我的优惠页
        {
          path: "benefit",
          component: benefit,
          children: [
            {
              path: "coupon", //代金券说明
              component: coupon,
            },
            {
              path: "hbDescription", //红包说明
              component: hbDescription,
            },
            {
              path: "hbHistory", //历史红包
              component: hbHistory,
            },
            {
              path: "exchange", //兑换红包
              component: exchange,
            },
            {
              path: "commend", //推荐有奖
              component: commend,
            },
          ],
        },
        //我的积分页
        {
          path: "points",
          component: points,
          children: [
            {
              path: "detail", //积分说明
              component: pointsDetail,
            },
          ],
        },
      ],
    },
  ],
});
