<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { AccRegisterParams, BanUserReq, UserInfo } from "../../model";
import { GENDER_MAP, USER_ROLE_TYPE, formatDateTime, success } from "../../utils/index"
import { getUserInfoVOByPage, createUser, banUser, unbanUser } from "../../service";

const router = useRouter();

/**
 * 挂载时处理一些数据
 */
onMounted(async () => {
  await loadUserByPage();
});

const userRoles = [
  {
    value: USER_ROLE_TYPE.MEMBER,
    label: "乐队成员",
  },
  {
    value: USER_ROLE_TYPE.FAN,
    label: "乐迷",
  },
];

const goBack = () => {
  router.back();
}
let userInfo = {} as UserInfo;

let pageSize = 10;
const userTotal = ref(0);
let userCurrPage = 1
const onUserCurrChange = async (curr: number) => {
  userCurrPage = curr
  await loadUserByPage();
}
const userInfoList = ref<UserInfo[]>([])
const loadUserByPage = async () => {
  const res = await getUserInfoVOByPage(userCurrPage, pageSize);
  userTotal.value = res.total
  userInfoList.value = res.records.map((info: UserInfo) => {
    return {
      ...info,
      email: info.email ?? " - "
    };
  });
}

const doBan = async (row: any) => {
  const req = {} as BanUserReq;
  req.userId = row.userId;
  const res = await banUser(req);
  if (res) {
    success("封禁成功！")
    await loadUserByPage();
  }
}

const doUnban = async (row: any) => {
  const req = {} as BanUserReq;
  req.userId = row.userId;
  const res = await unbanUser(req);
  if (res) {
    success("解封成功！")
    await loadUserByPage();
  }
}

const createUserReq = ref({} as AccRegisterParams);
const showCreateUser = ref(false);
const doCreateUser = async () => {
  const res = await createUser(createUserReq.value);
  if (res) {
    success("创建成功！")
    showCreateUser.value = false;
    await loadUserByPage();
    createUserReq.value = {} as AccRegisterParams;
  }
}
const doCancel = async () => {
  showCreateUser.value = false;
  createUserReq.value = {} as AccRegisterParams;
}


const showUserInfo = ref(false);
const doShowUserInfo = (row: any) => {
  showUserInfo.value = true;
  userInfo = row;
  if (userInfo.type == USER_ROLE_TYPE.MEMBER) {
    userInfo.memberInfoVO.joinTime = userInfo.memberInfoVO.joinTime ? formatDateTime(userInfo.memberInfoVO.joinTime) : " - ";
    userInfo.memberInfoVO.part = userInfo.memberInfoVO.part ?? " - ";
    userInfo.memberInfoVO.bandName = userInfo.memberInfoVO.bandName ?? " - ";
  }
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> 用户信息 </span>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" @click="showCreateUser = true">创建用户</el-button>
      </div>
    </template>
  </el-page-header>
  <el-table :data="userInfoList" style="width: 100%; margin-top: 36px;">
    <el-table-column fixed prop="userId" label="用户序号" width="120" />
    <el-table-column prop="nickname" label="用户昵称" width="220" />
    <el-table-column prop="email" label="用户邮箱" width="200" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button link type="primary" v-if="scope.row.isBanned" @click="doUnban(scope.row)">解禁</el-button>
        <el-button link type="warning" v-else @click="doBan(scope.row)">封禁</el-button>
        <el-button link type="primary" @click="doShowUserInfo(scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
  <el-pagination background :current-page="userCurrPage" layout="prev, pager, next" :total="userTotal"
    :page-size="pageSize" @current-change="onUserCurrChange" />

  <el-drawer v-model="showUserInfo" title="用户详细信息" direction="rtl" size="80%">
    <el-form label-width="120px" label-position="right">
      <el-form-item label="uid">
        <el-input disabled v-model="userInfo.userId" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input disabled v-model="userInfo.email" />
      </el-form-item>

      <template v-if="userInfo.type == USER_ROLE_TYPE.MEMBER">
        <!-- 乐队成员 -->
        <el-form-item label="姓名">
          <el-input disabled v-model="userInfo.memberInfoVO.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input disabled v-model="GENDER_MAP[userInfo.memberInfoVO.gender]" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input disabled v-model="userInfo.memberInfoVO.age" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input disabled v-model="userInfo.nickname" />
        </el-form-item>
        <el-form-item label="所在乐队">
          <el-input disabled v-model="userInfo.memberInfoVO.bandName" />
        </el-form-item>
        <el-form-item label="乐队分工">
          <el-input disabled v-model="userInfo.memberInfoVO.part" />
        </el-form-item>
        <el-form-item label="加入时间">
          <el-input disabled v-model="userInfo.memberInfoVO.joinTime" />
        </el-form-item>
      </template>
      <template v-else-if="userInfo.type == USER_ROLE_TYPE.FAN">
        <!-- 乐迷 -->
        <el-form-item label="姓名">
          <el-input disabled v-model="userInfo.fanInfoVO.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input disabled v-model="GENDER_MAP[userInfo.fanInfoVO.gender]" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input disabled v-model="userInfo.nickname" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input disabled v-model="userInfo.fanInfoVO.age" />
        </el-form-item>
        <el-form-item label="职业">
          <el-input disabled v-model="userInfo.fanInfoVO.career" />
        </el-form-item>
        <el-form-item label="学历">
          <el-input disabled v-model="userInfo.fanInfoVO.education" />
        </el-form-item>
      </template>
    </el-form>
  </el-drawer>

  <el-dialog v-model="showCreateUser" title="创建新用户">
    <el-form>
      <el-form-item>
        <el-input prefix-icon="user" v-model="createUserReq.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="lock" v-model="createUserReq.password" placeholder="请输入密码" type="password"
          show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="lock" v-model="createUserReq.checkedPassword" placeholder="请再次输入密码" type="password"
          show-password></el-input>
      </el-form-item>
      <el-form-item>
        <strong style="margin-right: 16px">选择角色</strong>
        <el-select v-model="createUserReq.type" class="m-2" placeholder="Select">
          <el-option v-for="item in userRoles" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary" @click="doCreateUser">创建</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 16px;
}
</style>
