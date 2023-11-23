import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('../layout/index.vue')
const Login = () => import('../pages/login/index.vue')
const Homepage = () => import('../pages/homePage/index.vue')
const Template = () => import('../pages/template/index.vue')
const TemplateDetail = () => import('../pages/template/detail.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta: {
      icon: 'Menu',
      isNav: true
    },
    children: [
      {
        path: '/admin/home',
        component: Homepage,
        name: 'home',
        meta: {
          isNav: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    redirect: '/admin/home'
  }
]

const asyncRouter: RouteRecordRaw[] = [
  {
    path: '/template',
    component: Layout,
    name: 'template',
    meta: {
      icon: 'PieChart',
      isNav: true,
      role: ['admin', 'editor', 'normal']
    },
    children: [
      {
        path: '/template/list',
        component: Template,
        name: 'template',
        meta: {
          isNav: true,
          role: ['admin', 'editor', 'normal']
        }
      },
      {
        path: '/template/detail',
        component: TemplateDetail,
        name: 'templateDetail',
        meta: {
          isNav: true,
          role: ['admin', 'editor', 'normal']
        }
      }
    ]
  }
]
const CurrentRoute: RouteRecordRaw[] = routes.concat(...asyncRouter)
export default CurrentRoute
