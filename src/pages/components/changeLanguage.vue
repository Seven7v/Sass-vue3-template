<script setup lang="ts">
import { getCurrentInstance, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

// 切换语言
const { proxy } = getCurrentInstance() as any
const { t } = useI18n()
const lang = ref('chinese')

watchEffect(() => {
  if (lang.value === 'chinese') {
    proxy.$i18n.locale = 'zh'
    localStorage.setItem('lang', 'zh')
  }
  if (lang.value === 'english') {
    proxy.$i18n.locale = 'en'
    localStorage.setItem('lang', 'en')
  }
})
</script>

<template>
  <el-select style="width: 100px" v-model="lang">
    <el-option :label="t('Chinese')" value="chinese" />
    <el-option :label="t('English')" value="english" />
  </el-select>
</template>
