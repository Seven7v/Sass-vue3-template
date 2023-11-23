<template>
  <div class="login cen disflex ai-cen">
    <div class="login-form-wrapper disflex">
      <div class="login-img-wrapper bg-prim">
        <div class="login-title fw900">{{ $t('login.management') }}</div>
        <img class="login-img" src="../../assets/img/login.svg" alt="" />
      </div>
      <div class="login-box">
        <el-card class="login-inner">
          <changeLanguage class="login-lang" />

          <el-form
            ref="formRef"
            :model="dynamicValidateForm"
            label-width="100px"
            label-position="left"
            class="login-form mb30"
          >
            <el-form-item
              prop="username"
              :label="t('login.username')"
              :rules="[
                {
                  required: true,
                  message: t('login.usernameRequire'),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input v-model="dynamicValidateForm.username" />
            </el-form-item>
            <el-form-item
              prop="password"
              :label="t('login.password')"
              :rules="[
                {
                  required: true,
                  message: t('login.passwordRequire'),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input type="password" v-model="dynamicValidateForm.password" />
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login-btn" @click="submitForm(formRef)">{{
            t('login.login')
          }}</el-button>
          <el-button class="login-btn" @click="resetForm(formRef)">{{
            t('login.concel')
          }}</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { InterfaceLoginReq } from '../../type'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { loginApi, createUserApi } from '../../sever/api'
import { setLoginTimeApi } from '../../sever/data'
import changeLanguage from '../components/changeLanguage.vue'

const { t } = useI18n()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<InterfaceLoginReq>({
  username: 'admin',
  password: 'admin'
})
const router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      // 创建用户时使用
      // await createUserApi(dynamicValidateForm)
      const res = await loginApi(dynamicValidateForm)
      if (res.data.code == 200) {
        localStorage.setItem('token', res.data.token)
        // const loginTimeParams = {
        //   username: dynamicValidateForm.username,
        //   loginTime: new Date()
        // }
        // const resq = await setLoginTimeApi(loginTimeParams)
        // console.log(resq)
        router.push({
          name: 'home'
        })
      }
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  &-form-wrapper {
    width: 100%;
    height: 100%;
  }
  &-img-wrapper {
    width: 50%;
  }
  &-title {
    font-size: 40px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #fff;
    margin-top: 15%;
    margin-bottom: 15%;
    margin-left: 10%;
  }
  &-img {
    width: 60%;
    margin-left: 30%;
  }
  &-form {
    margin-bottom: 20px;
  }
  &-box {
    width: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-inner {
    position: relative;
    width: 60%;
    height: 400px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-lang {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  &-btn {
    width: 100%;
    margin-bottom: 15px;
  }
}
/deep/ .el-button + .el-button {
  margin-left: 0;
}
</style>
