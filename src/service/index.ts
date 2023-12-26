import http from "../plugins/http";
import { AccLoginParams, AccRegisterParams, BanUserReq } from "../model";

/**
 * 账号登录
 */
export const accLogin = async (accLoginParams: AccLoginParams) => {
  const res = await http.post("/user/acc_login", {
    ...accLoginParams,
  });
  if (res.data) {
    return res.data;
  }
};

export const createUser = async (params: AccRegisterParams) => {
  const res = await http.post("/admin/user/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const banUser = async (params: BanUserReq) => {
  const res = await http.post("/admin/user/ban", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const unbanUser = async (params: BanUserReq) => {
  const res = await http.post("/admin/user/unban", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const getAuthType = async () => {
  const res = await http.get("/user/auth");
  if (res.data) {
    return res.data;
  }
};

export const userLogout = async () => {
  const res = await http.post("/user/logout");
  if (res.data) {
    return res.data;
  }
};

export const getUserInfoVOByPage = async (curr: number, size: number) => {
  const res = await http.get("/admin/page/user", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};
