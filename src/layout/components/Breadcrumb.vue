<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

// 面包屑列表
const list = ref([
  {
    title: t(`routes.home`),
    path: '/admin/home'
  }
])

//监听路由变化
watch(
  route,
  (to: any) => {
    //每次切换路由时，清空以前的列表，只保留首页
    list.value = []
    // 首页不显示面包屑
    // if (to.fullPath === '/admin/home') return
    //只有一级菜单，则只添加一次
    if (to.matched[0].children.length === 1) {
      list.value.push({
        title: to.name,
        path: to.fullPath
      })
      return
    } else {
      //有二级菜单
      to.matched.forEach((item: any) => {
        list.value.push({
          title: item.name,
          path: item.fullPath
        })
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="mod-bread-crumb ml20">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in list" :key="item.title" :to="{ path: item.path }">
        {{ t(`routes.${item.title}`) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="less">
.mod-bread-crumb {
  .el-breadcrumb {
    display: flex;
    justify-content: baseline;
    height: 64px;
    background-color: #fff;
    .toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
    }
    .el-breadcrumb-item {
      cursor: pointer;
    }
  }
  .is-link {
    color: #1e20d3cf;
  }
}
</style>
