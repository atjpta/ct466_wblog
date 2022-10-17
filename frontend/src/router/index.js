import { createRouter, createWebHistory } from 'vue-router'
import welcome from '../views/WelcomeView.vue'
import { authStore } from "@/stores/auth.store";
import { blogStore } from '@/stores/blog.store'

// khi đăng nhập sẽ chuyển sang trang rooms
const redirectIfLoggedIn = (_to, _from) => {
  if (authStore().isUserLoggedIn) {
    return {
      name: "homeblog",
    };
  }
};

const redirectEditBlog = (_to, _from) => {
  const list = blogStore().ListBlog
  list.forEach(blog => {
    if (blog.id == _to.params.id && blog.author.id != authStore().user.id) {
      return {
        name: "NotFound",
      };
    }
  })


};

const routes = [
  {
    path: '/',
    name: 'home',
    component: welcome,
    // này để các trang không cần đăng nhập
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/trang2',
    name: 'trang2',
    component: () => import('@/views/Trang2View.vue'),

  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProFileView.vue'),

  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import('@/views/EditProFileView.vue'),

  },
  {
    path: '/homeblog',
    name: 'homeblog',
    component: () => import('@/views/HomeBlogView.vue'),
  },
  {
    path: '/readblog/:id',
    name: 'readblog',
    component: () => import('@/views/ReadBlogView.vue'),
  },
  {
    path: '/editblog/:id',
    name: 'editblog',
    component: () => import('@/views/blog/EditBlogView.vue'),
    beforeEnter: redirectEditBlog,
  },
  {
    path: '/addblog',
    name: 'addblog',
    component: () => import('@/views/blog/AddBlogView.vue'),
  },

  {
    path: '/searchashtag/:id',
    name: 'searchashtag',
    component: () => import('@/views/SearchHashtagView.vue'),
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('@/views/shop/RechargeView.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// nếu vào trang private thì nó sẽ bắt đăng nhập, nếu đăng nhập thành công sẽ chuyển sang trang mà đang muốn vào
router.beforeEach((to, _from) => {
  const authRequired = !to.meta.publicPage;
  const auth = authStore();

  if (authRequired && !auth.isUserLoggedIn) {
    const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
    return {
      name: "login",
      query,
    };
  }
});


export default router
