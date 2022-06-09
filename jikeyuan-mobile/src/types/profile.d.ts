import { AxiosResponse } from "axios";

export type UserInfo = {
  id: string; // 	用户id
  name: string; // 用户名
  photo: string; // 用户头像
  is_media: string; // 是否是自媒体，0-否，1-是
  intro: string; // 	简介
  certi: string; // 	自媒体认证说明
  art_count: string; // 	发布文章数
  follow_count: string; // 	关注的数目
  fans_count: string; // 粉丝的数量
  like_count: string; // 	被点赞数
};

export type UserInfoResponse = AxiosResponse<UserInfo>;

export type UserProfileInfo = {
  id: string; // 用户id
  name: string; // 用户名
  photo: string; // 头像
  mobile: string; // 手机号
  gender: number; // 性别，0-男，1-女
  birthday: string; // 生日，格式 '2018-12-20'
  intro?: string;
};

export type UserProfileInfoResponse = AxiosResponse<UserProfileInfo>;

export type UpdatePhotoRequestParams = {
  photo: File;
};

export type UpdatePhoto = {
  id: string; //	必须		用户id
  photo: string; //	必须		头像url地址
};

export type UpdatePhotoResponse = AxiosResponse<UpdatePhoto>;

export type UpdateProfileInfoRequestParams = {
  name?: string; // 昵称
  gender?: number; // 性别，0-男，1-女
  birthday?: string; // 生日，格式'2018-12-20'
  intro?: string; // 个人介绍
};
