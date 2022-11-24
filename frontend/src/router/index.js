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
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/dangki',
    name: 'dangki',
    component: () => import('@/views/auth/RegistrationView.vue'),
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
    path: '/homeblog',
    name: 'homeblog',
    component: () => import('@/views/blog/HomeBlogView.vue'),
  },
  
  {
    path: '/readblog/:id',
    name: 'readblog',
    component: () => import('@/views/blog/ReadBlogView.vue'),
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
    path: '/addquestion',
    name: 'addquestion',
    component: () => import('@/views/question/AddQuestionView.vue'),
  },
  {
    path: '/editquestion/:id',
    name: 'editquestion',
    component: () => import('@/views/question/EditQuestionView.vue'),
  },
  {
    path: '/readquestion/:id',
    name: 'readquestion',
    component: () => import('@/views/question/ReadQuestionView.vue'),
  },
  {
    path: '/homequestion',
    name: 'homequestion',
    component: () => import('@/views/question/HomeQuestionView.vue'),
  },


  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/oderUser/ProFileOtherView.vue'),
  },

  {
    path: '/searchashtag/:id',
    name: 'searchashtag',
    component: () => import('@/views/search/SearchHashtagView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard', 
    component: () => import('@/views/dashboard/DashBoardView2.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/dashboard/pageUser/ProFileView.vue'),
      },
      {
        path: 'follow',
        name: 'follow',
        component: () => import('@/views/dashboard/pageUser/FollowView.vue'),
      },
      {
        path: 'followblog',
        name: 'followblog',
        component: () => import('@/views/dashboard/pageUser/FollowBlogView.vue'),
      },
      {
        path: 'blogunlocked',
        name: 'blogunlocked',
        component: () => import('@/views/dashboard/pageUser/ListUnlockView.vue'),
      },

      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/dashboard/pageBuy/CartView.vue'),
      },
      {
        path: 'historybill',
        name: 'historybill',
        component: () => import('@/views/dashboard/pageBuy/HistoryBillView.vue'),
      },
      {
        path: 'detailbill/:id',
        name: 'detailbill',
        component: () => import('@/views/dashboard/pageBuy/DetailView.vue'),
      },

      {
        path: 'manageblog',
        name: 'manageblog',
        component: () => import('@/views/dashboard/pageManageBlog/ManageBlogView.vue'),
      },
      
      {
        path: 'managequestion',
        name: 'managequestion',
        component: () => import('@/views/dashboard/pageManageBlog/ManageQuestionView.vue'),
      },
      {
        path: 'reportblog',
        name: 'reportblog',
        component: () => import('@/views/dashboard/pageAdmin/ReportBlogView.vue'),
      },
      {
        path: 'reportquestion',
        name: 'reportquestion',
        component: () => import('@/views/dashboard/pageAdmin/ReportQuestionView.vue'),
      },
    ]
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
