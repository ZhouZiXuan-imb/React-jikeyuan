import React, { useEffect, useState } from "react";
import { Input, NavBar, TextArea, Toast } from "antd-mobile";
import "./index.scss";
import { useAppDispatch } from "@/hooks/store";
import { fetchUpdateProfileInfo } from "@/store/asyncThunk/profile.thunk";

type PropsType = {
  type: string;
  value: string;
  onInputPopupHide: () => void;
};

function EditInput(props: PropsType) {
  let { type, value, onInputPopupHide } = props;
  const dispatch = useAppDispatch();

  const isEditName = type === "name";

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
    return () => {
      setInputValue("");
    };
  }, [type, value]);

  const navBarRightComp = (
    <div className="popup-right">
      <span
        className="popup-right-text"
        onClick={() => {
          dispatch(fetchUpdateProfileInfo({ [type]: inputValue }));
          onInputPopupHide();

          Toast.show({
            icon: "success",
            content: "信息修改成功",
          });
        }}
      >
        提交
      </span>
    </div>
  );

  return (
    <div className="edit-input">
      <NavBar
        onBack={() => {
          onInputPopupHide();
        }}
        right={navBarRightComp}
      >
        编辑{isEditName ? "昵称" : "简介"}
      </NavBar>
      <div className="edit-input-content">
        {isEditName ? (
          <div className="input-wrap">
            <Input
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              placeholder="请输入昵称"
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入内容"
            value={inputValue}
            onChange={(value) => setInputValue(value)}
            rows={4}
            maxLength={100}
            showCount
          />
        )}
      </div>
    </div>
  );
}

export default EditInput;
