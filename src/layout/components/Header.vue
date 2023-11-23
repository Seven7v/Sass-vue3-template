<template>
  <div class="mod-header bg-blod disflex sp-btw ai-cen">
    <div class="disflex">
      <img class="logo-img mr15" src="../../assets/img/logo.svg" alt="" />
      <h1>
        {{ $t('header.welcome') }}
      </h1>
    </div>
    <div>
      <changeLanguage class="mr10" />
      <span>{{ userInfo.username }}</span>
      <el-button class="mr10 logout-btn" link @click="handleOpenConfirm">{{
        $t('login.logout')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import changeLanguage from '../../pages/components/changeLanguage.vue'
import { UserInfoRes } from '../../type'
import { logoutApi } from '../../sever/api'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const { t } = useI18n()
const userInfo: UserInfoRes = reactive(JSON.parse(localStorage.getItem('userInfo')))
const router = useRouter()

// 登录确认
const handleOpenConfirm = () => {
  ElMessageBox.confirm(t('header.confirmLogout'), t('header.tips'), {
    confirmButtonText: t('OK'),
    cancelButtonText: t('cancel'),
    type: 'warning'
  })
    .then(() => {
      handleLogout()
    })
    .catch(() => {})
}

// 退出登录
const handleLogout = async () => {
  // node-admin登出接口
  //   const result = await logoutApi()
  //清除信息
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push({
    name: 'login'
  })
}
</script>

<style lang="less">
.mod-header {
  height: 80px;
  .logout-btn {
    color: #fff;
  }
  .logout-btn:hover {
    color: aliceblue;
  }
}
.logo-img {
  width: 70px;
}
</style>
