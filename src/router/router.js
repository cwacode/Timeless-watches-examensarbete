import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue';
import WatchDetails from '../views/WatchDetails.vue';
import About from '@/views/About.vue';
import Checkout from '@/views/Checkout.vue';
import Confirmation from '@/views/Confirmation.vue';
import OrdersPage from '@/views/OrdersPage.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/catalog', 
      name: 'Catalog', 
      component: Catalog 
    },
    { 
      path: '/watch/:id',
      name: 'WatchDetails',
      component: WatchDetails,
      props: route => ({ id: Number(route.params.id) }) 
    },
    { 
      path: '/about',
      name: 'About',
      component: About,
      props: (route) => ({ query: route.query.q })
    },
    { 
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: Confirmation,
    },
    {
      path: '/orders',
      name: 'OrdersPage',
      component: OrdersPage,
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        } else if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

export default router;
