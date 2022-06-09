// 获取用户自己的信息
import { AxiosPromise } from "axios";
import { requestWidthToken } from "@/utils/request";
import { UpdateProfileInfoRequestParams } from "@/types/profile";

// 获取用户自己信息
export function getUserInfo<T>(): AxiosPromise<T> {
  return requestWidthToken.get("/user");
}

// 获取用户个人信息
export function getUserProfileInfo<T>(): AxiosPromise<T> {
  return requestWidthToken.get("/user/profile");
}

// 修改用户头像
export function updatePhoto<T>(photo: FormData): AxiosPromise<T> {
  return requestWidthToken.patch("/user/photo", photo);
}

// 修改用户个人信息
export function UpdateUserProfileInfo(payload: UpdateProfileInfoRequestParams) {
  return requestWidthToken.patch("/user/profile", payload);
}
