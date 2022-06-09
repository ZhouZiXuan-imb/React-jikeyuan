import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ActionSheet,
  DatePicker,
  List,
  NavBar,
  Popup,
  Toast,
} from "antd-mobile";
import { useNavigate } from "react-router";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  fetchUpdatePhoto,
  fetchUpdateProfileInfo,
  fetchUserInfo,
  fetchUserProfileInfo,
} from "@/store/asyncThunk/profile.thunk";
import dayjs from "dayjs";
import EditInput from "@/components/EditInput";

type Action = {
  text: string;
  key: string;
  onClick: () => void;
};

function ProfileInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const {
    name,
    gender,
    photo,
    birthday,
    intro: userProfileInfoIntro,
  } = useAppSelector((state) => state.profile.userProfileInfo);

  const { intro: userInfoIntro } = useAppSelector(
    (state) => state.profile.userInfo
  );

  const [isShowHeadPortrait, setIsShowHeadPortrait] = useState(false);
  const portraitActions: Action[] = [
    {
      text: "拍照",
      key: "photograph",
      onClick: () => {
        fileRef.current!.click();
      },
    },
    {
      text: "本地选择",
      key: "local",
      onClick: () => {
        fileRef.current!.click();
      },
    },
  ];

  const [isShowGender, setIsShowGender] = useState(false);
  const genderActions: Action[] = [
    {
      text: "男",
      key: "man",
      onClick: () => {
        dispatch(fetchUpdateProfileInfo({ gender: 0 }));
        setIsShowGender(false);

        Toast.show({
          icon: "success",
          content: "信息修改成功",
        });
      },
    },
    {
      text: "女",
      key: "woman",
      onClick: () => {
        dispatch(fetchUpdateProfileInfo({ gender: 1 }));
        setIsShowGender(false);

        Toast.show({
          icon: "success",
          content: "信息修改成功",
        });
      },
    },
  ];

  // 上传文件
  // 创建获取 file 的 ref 对象
  const fileRef = useRef<HTMLInputElement>(null);

  // 修改图片地址方法
  async function onChangePhoto(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    // console.log('选择的头像为：', e.target.files)
    if (!e.target.files) {
      return Toast.show({
        content: "请选择要上传的头像",
        duration: 1000,
      });
    }

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    await dispatch(fetchUpdatePhoto(formData));

    // onListPopupHide()
    Toast.show({
      icon: "success",
      content: "头像上传成功",
      duration: 600,
    });
    setIsShowHeadPortrait(false);
  }

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  // 修改生日日期
  function onChangeBirthday(value: Date) {
    let newBirthday = dayjs(value).format("YYYY-MM-DD");
    // console.log(newBirthday);
    dispatch(fetchUpdateProfileInfo({ birthday: newBirthday }));
    Toast.show({
      icon: "success",
      content: "信息修改成功",
    });
  }

  type InputPopup = {
    type: "" | "name" | "intro";
    value: string;
    visible: boolean;
  };
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    // 编辑昵称或简介，如果是昵称值为：'name'；如果是简介为：'intro'
    type: "",
    // 昵称或简介的值
    value: "",
    // 弹出层展示或隐藏
    visible: false,
  });

  function onChangeInputPopup(
    type: InputPopup["type"],
    value: InputPopup["value"]
  ) {
    setInputPopup({
      type,
      value,
      visible: true,
    });
  }

  // 关闭修改昵称和简介弹出框
  function editNameOrIntroPopupHide() {
    setInputPopup({ value: "", type: "", visible: false });
  }

  return (
    <div className="profile-info">
      <div className="container">
        <NavBar onBack={() => navigate(-1)}>个人信息</NavBar>

        <List>
          <List.Item
            extra={
              <span className="avatar-wrapper">
                <img
                  width={24}
                  height={24}
                  src={
                    photo || "http://toutiao.itheima.net/images/user_head.jpg"
                  }
                  alt=""
                />
              </span>
            }
            onClick={() => setIsShowHeadPortrait(true)}
          >
            头像
            <ActionSheet
              cancelText="取消"
              visible={isShowHeadPortrait}
              actions={portraitActions}
              onClose={() => setIsShowHeadPortrait(false)}
            />
          </List.Item>
          <List.Item
            extra={name}
            onClick={() => {
              // 显示修改昵称的弹出框
              onChangeInputPopup("name", name);
            }}
          >
            昵称
          </List.Item>
          <List.Item
            extra={userProfileInfoIntro ? userProfileInfoIntro : userInfoIntro}
            onClick={() => {
              // 显示修改简介的弹出框
              onChangeInputPopup(
                "intro",
                userProfileInfoIntro ? userProfileInfoIntro : userInfoIntro
              );
            }}
          >
            简介
          </List.Item>
        </List>

        <List style={{ marginTop: 10 }}>
          <List.Item
            extra={gender + "" === "0" ? "男" : "女"}
            onClick={() => setIsShowGender(true)}
          >
            性别
            <ActionSheet
              cancelText="取消"
              visible={isShowGender}
              actions={genderActions}
              onClose={() => setIsShowGender(false)}
            />
          </List.Item>
          <List.Item extra={birthday} onClick={() => setIsShowDatePicker(true)}>
            生日
            <DatePicker
              title="选择生日"
              visible={isShowDatePicker}
              onClose={() => {
                setIsShowDatePicker(false);
              }}
              min={new Date("1900-01-01")}
              max={new Date()}
              value={new Date(birthday)}
              onConfirm={onChangeBirthday}
            />
          </List.Item>
        </List>

        {/* 创建 input[type=file] 标签 */}
        <input
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => onChangePhoto(event)}
        />

        <Popup
          position="right"
          bodyStyle={{ width: "100vw" }}
          visible={inputPopup.visible}
        >
          <EditInput
            type={inputPopup.type}
            value={inputPopup.value}
            onInputPopupHide={editNameOrIntroPopupHide}
          />
        </Popup>
      </div>
    </div>
  );
}

export default ProfileInfo;
