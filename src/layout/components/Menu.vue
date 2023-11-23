<template>
  <!-- 无子选择的菜单显示 -->
  <div>
    <el-menu-item
      v-for="item of subRoutes.children"
      :key="item.name"
      :index="item.name"
      @click="handleClick(item.path)"
    >
      <el-icon> <component :is="subRoutes.meta.icon" /> </el-icon>
      <template #title>
        <span>{{ $t(`routes.${item.name}`) }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  subRoutes: {
    type: Object,
    default: {}
  }
})
const handleClick = (path: string) => {
  router.push(path)
}
</script>

<style lang="less"></style>
