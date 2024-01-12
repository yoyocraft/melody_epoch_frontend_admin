<script setup lang="ts">
// import { House, User } from "@element-plus/icons-vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserAuthType } from "../model/index"
import { getAuthType } from "../service/index"

const route = useRoute();
const router = useRouter();

const doSelect = (index: string) => {
  router.push({
    path: index,
  });
};

const currUserType = ref({
  isAdmin: true
} as UserAuthType);

onMounted(async () => {
  const res = await getAuthType();
  currUserType.value = res;
})
watch(
  () => route.path,
  async (_, __) => {
    const res = await getAuthType();
    currUserType.value = res;
  }
)

</script>

<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu :default-active="route.path ?? '/'" @select="doSelect" v-if="currUserType.isAdmin">
        <!-- <el-menu-item index="/">
          <el-icon>
            <House />
          </el-icon>
          <template #title>
            <span>首页</span>
          </template>
        </el-menu-item> -->
        <el-menu-item index="/user">
          <el-icon>
            <User />
          </el-icon>
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped></style>
