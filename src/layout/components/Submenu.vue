<template>
  <!-- 有子选项的菜单显示 -->
  <div>
    <el-sub-menu :index="subRoutes.name">
      <template #title>
        <el-icon> <component :is="subRoutes.meta.icon" /> </el-icon>
        <span v-if="!collapse">{{ $t(`routes.${subRoutes.name}`) }}</span>
      </template>
      <el-menu-item
        v-for="i of subRoutes.children"
        :key="i.name"
        :index="i.name"
        @click="handleClick(i.path)"
      >
        <span>{{ $t(`routes.${i.name}`) }}</span>
      </el-menu-item>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  subRoutes: {
    type: Object,
    default: {}
  },
  collapse: {
    type: Boolean,
    default: false
  }
})
const handleClick = (path: string) => {
  router.push(path)
}
</script>

<style lang="less"></style>
