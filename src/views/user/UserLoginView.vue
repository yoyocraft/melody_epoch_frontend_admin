<script setup lang="ts">
import { ref } from "vue";
import { accLogin } from "../../service/index";
import { success } from "../../utils/index";
import { AccLoginParams } from "../../model/index";

import { useRouter } from "vue-router";


const accLoginParams = ref({} as AccLoginParams);
const loginType = "acc";
/**
 * 执行登录
 */
const login = async () => {
  const token = await accLogin(accLoginParams.value);
  localStorage.setItem("token", token);
  success("登录成功");
  router.push({
    path: "/",
    replace: true
  })
};

const router = useRouter();

const url = "/src/assets/logo.png";
</script>

<template>
  <div class="custom-container">
    <div>
      <el-form class="login-form">
        <el-image style="width: 100px; height: 100px" :src="url" />
        <h1>Melody-Epoch-Admin</h1>
        <el-tabs v-model="loginType" type="card" class="demo-tabs" stretch>
          <el-tab-pane label="账号登录" name="acc">
            <el-form-item>
              <el-input prefix-icon="user" v-model="accLoginParams.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="lock" v-model="accLoginParams.password" placeholder="请输入密码" type="password"
                show-password>
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-form-item class="button-container">
            <el-button type="primary" @click="login" size="large" style="width: 400px">立即登录</el-button>
          </el-form-item>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  /* Hide overflow */
}

.demo-tabs {
  justify-content: center;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #0a2759;
  font-size: 32px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}
</style>
