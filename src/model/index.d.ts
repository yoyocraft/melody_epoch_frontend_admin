export interface UserAuthType {
  isFan: boolean;
  isLeader: boolean;
  isAdmin: boolean;
}

export interface AccRegisterParams {
  account: string;
  password: string;
  checkedPassword: string;
  type: number;
}

export interface AccLoginParams {
  account: string;
  password: string;
}

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  type: number;
  isBanned: boolean;
  memberInfoVO: MemberInfo;
  fanInfoVO: FanInfo;
}

export interface MemberInfo {
  memberId: number;
  name: string;
  gender: number;
  age: number;
  part: string;
  joinTime: string;
  leaveTime: string;
  bandId: number;
  bandName: string;
}

export interface FanInfo {
  fanId: number;
  name: string;
  gender: number;
  age: number;
  career: string;
  education: string;
}

export interface BanUserReq {
  userId: number;
}
