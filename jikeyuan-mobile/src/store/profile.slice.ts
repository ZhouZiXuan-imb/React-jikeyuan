import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUpdatePhoto,
  fetchUpdateProfileInfo,
  fetchUserInfo,
  fetchUserProfileInfo,
} from "@/store/asyncThunk/profile.thunk";
import { UserInfo, UserProfileInfo } from "@/types/profile";

export const PROFILE_SLICE_NAME = "profile";

type initialStateType = {
  userInfo: UserInfo;
  userProfileInfo: UserProfileInfo;
};

let initialState: initialStateType = {
  userInfo: {
    id: "", // 	用户id
    name: "", // 用户名
    photo: "", // 用户头像
    is_media: "", // 是否是自媒体，0-否，1-是
    intro: "", // 	简介
    certi: "", // 	自媒体认证说明
    art_count: "", // 	发布文章数
    follow_count: "", // 	关注的数目
    fans_count: "", // 粉丝的数量
    like_count: "", // 	被点赞数
  },
  userProfileInfo: {
    id: "",
    name: "",
    photo: "",
    gender: 0,
    mobile: "",
    birthday: "",
  },
};

const { reducer: profileReducer } = createSlice({
  name: PROFILE_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      let {
        payload: {
          data: {
            id, // 	用户id
            name, // 用户名
            photo, // 用户头像
            is_media, // 是否是自媒体，0-否，1-是
            intro, // 	简介
            certi, // 	自媒体认证说明
            art_count, // 	发布文章数
            follow_count, // 	关注的数目
            fans_count, // 粉丝的数量
            like_count, // 	被点赞数
          },
        },
      } = action;

      state.userInfo = {
        id, // 	用户id
        name, // 用户名
        photo, // 用户头像
        is_media, // 是否是自媒体，0-否，1-是
        intro, // 	简介
        certi, // 	自媒体认证说明
        art_count, // 	发布文章数
        follow_count, // 	关注的数目
        fans_count, // 粉丝的数量
        like_count, // 	被点赞数
      };
    });
    builder.addCase(fetchUserProfileInfo.fulfilled, (state, action) => {
      let {
        payload: {
          data: { id, name, photo, gender, mobile, birthday },
        },
      } = action;
      state.userProfileInfo = { id, name, photo, gender, mobile, birthday };
    });
    builder.addCase(fetchUpdatePhoto.fulfilled, (state, action) => {
      let {
        payload: {
          data: { photo },
        },
      } = action;

      state.userInfo.photo = photo;
    });
    builder.addCase(fetchUpdateProfileInfo.fulfilled, (state, action) => {
      let { payload } = action;
      state.userProfileInfo = {
        ...state.userProfileInfo,
        ...payload,
      };

      // console.log(state.userProfileInfo);
    });
  },
});

export default profileReducer;
