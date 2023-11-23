import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { getUserInfoApi } from '../sever/api'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(), //history模式
  routes
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = localStorage.getItem('token')
  if (isAuthenticated) {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo === null) {
      // const resq = await getUserInfoApi()
      const userInfo = {
        username: 'admin'
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
})
// export default route 将路由导出的写法

// 封装路由方法，传入app <Element> 代表页面内的标签元素
export const initRouter = (app: App<Element>) => {
  app.use(router)
}
