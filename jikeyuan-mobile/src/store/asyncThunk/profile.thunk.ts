import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getUserProfileInfo,
  updatePhoto,
  UpdateUserProfileInfo,
} from "@/api/profileApi";
import {
  UpdatePhotoResponse,
  UpdateProfileInfoRequestParams,
  UserInfoResponse,
  UserProfileInfoResponse,
} from "@/types/profile";

export const fetchUserInfo = createAsyncThunk<UserInfoResponse>(
  "profile/fetchUserInfoStatus",
  () => {
    try {
      return getUserInfo();
    } catch (error) {
      throw new Error("用户信息获取失败");
    }
  }
);

export const fetchUserProfileInfo = createAsyncThunk<UserProfileInfoResponse>(
  "profile/fetchUserProfileInfoStatus",
  () => {
    try {
      return getUserProfileInfo();
    } catch (error) {
      throw new Error("用户个人信息获取失败");
    }
  }
);

export const fetchUpdatePhoto = createAsyncThunk<UpdatePhotoResponse, FormData>(
  "profile/fetchUpdatePhotoStatus",
  (file) => {
    try {
      return updatePhoto(file);
    } catch (error) {
      throw new Error("头像上传错误");
    }
  }
);

export const fetchUpdateProfileInfo = createAsyncThunk<
  UpdateProfileInfoRequestParams,
  UpdateProfileInfoRequestParams
>("profile/fetchUpdateProfileInfo", (payload) => {
  UpdateUserProfileInfo(payload);
  return payload;
});
