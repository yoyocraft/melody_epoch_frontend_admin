<script lang="ts" setup>
import { useRouter } from "vue-router";
import { userLogout } from "../service/index"
import { success } from "../utils";

const router = useRouter();
const logout = async () => {
  const res = await userLogout();
  console.log(res);

  if (res) {
    router.push({
      path: "/login",
      replace: true
    })
  }
  success("登出成功");
};

</script>

<template>
  <el-menu default-active="0" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <h1>Melody-Epoch-Admin</h1>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-sub-menu index="1">
      <template #title><el-avatar src="/src/assets/avatar.jpg" /></template>
      <el-menu-item @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
