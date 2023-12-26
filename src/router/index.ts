import IndexViewVue from "../views/IndexView.vue";
import UserInfoViewVue from "../views/user/UserInfoView.vue";
import UserLoginViewVue from "../views/user/UserLoginView.vue";

const routes = [
  {
    path: "/",
    name: "主页",
    component: IndexViewVue,
  },
  {
    path: "/user",
    name: "用户管理页",
    component: UserInfoViewVue,
  },
  {
    path: "/login",
    name: "登录页",
    component: UserLoginViewVue,
  },
];

export default routes;
