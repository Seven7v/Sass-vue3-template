<template>
  <div>
    <el-menu
      default-active="home"
      @open="handleOpen"
      @close="handleClose"
      class="el-menu-vertical-demo h100"
      :collapse="isCollapse"
    >
      <component
        v-for="item of subMenu"
        :key="item.name"
        :collapse="isCollapse"
        :sub-routes="item"
        :is="item.children.length === 1 ? Menu : Submenu"
      />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import routes from '../../routes/routes.ts'
import { RouteRecordRaw } from 'vue-router'
import Submenu from './Submenu.vue'
import Menu from './Menu.vue'
import { ref, onMounted, watchEffect, reactive } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const screenWidth = ref(
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
)
const isCollapse = ref(false)
const handleRouter = (route: RouteRecordRaw[]): RouteRecordRaw[] => {
  let subRoute: RouteRecordRaw[] = []
  subRoute = route.filter(item => {
    if (item.children) {
      handleRouter(item.children)
    }
    return item.meta && item.meta.isNav
  })
  return subRoute
}
const subMenu: RouteRecordRaw[] = handleRouter(routes)
console.log(subMenu)

onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })()
  }
})

// 检测页面大小判断菜单折叠
watchEffect(() => {
  if (screenWidth.value < 700) {
    isCollapse.value = true
  } else {
    isCollapse.value = false
  }
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
