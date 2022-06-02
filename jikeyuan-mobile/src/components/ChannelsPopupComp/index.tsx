import React, { useEffect, useState } from "react";
import { Button, NavBar, Popup } from "antd-mobile";
import { CloseOutline, CloseCircleFill } from "antd-mobile-icons";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  addChannel,
  changeActiveKey,
  fetchAllChannels,
  removeChannel,
} from "@/store/home.slice";
import { Channel } from "@/types/data";

type ChannelsPopupCompPropsType = {
  isShowUpdateChannels: boolean;
  setIsShowUpdateChannels: Function;
};

function ChannelsPopupComp(props: ChannelsPopupCompPropsType) {
  const { isShowUpdateChannels, setIsShowUpdateChannels } = props;
  const dispatch = useAppDispatch();

  // NavBar右边的内容
  const closeUpdateChannels = (
    <div className={"close"}>
      <span onClick={() => setIsShowUpdateChannels(false)}>
        <i>
          <CloseOutline />
        </i>
      </span>
    </div>
  );

  const [toggleEditAndDone, setToggleEditAndDone] = useState(true);

  // 编辑频道
  function handleEditChannels() {
    setToggleEditAndDone(false);
  }
  // 频道编辑完成
  function handleEditChannelsDone() {
    setToggleEditAndDone(true);
  }

  // 获取store中的频道列表
  const channelsList = useAppSelector((state) => state.home.channels);

  // 获取store中的所有频道列表
  const allChannelsList = useAppSelector(
    (state) => state.home.optionalChannels
  );

  // 修改频道
  function handleChangeChannel(channelId: string) {
    dispatch(changeActiveKey(channelId));
    setIsShowUpdateChannels(false);
  }

  // 获取所有频道列表
  useEffect(() => {
    dispatch(fetchAllChannels());
  }, []);

  function handleAddChannel(channel: Channel) {
    dispatch(addChannel(channel));
  }

  function handleRemoveChannels(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    channel: Channel
  ) {
    e.stopPropagation();
    dispatch(removeChannel(channel));
  }

  let channelActiveKey = useAppSelector((state) => state.home.channelActiveKey);

  return (
    <Popup
      visible={isShowUpdateChannels}
      onMaskClick={() => {
        setIsShowUpdateChannels(false);
      }}
      position="left"
      bodyStyle={{ width: "100vw" }}
    >
      <NavBar back={null} right={closeUpdateChannels}></NavBar>
      <div className="channels">
        <div className="title">
          <div className="title-left">
            <span className="my-channels">我的频道：</span>
            <span className="title-text">点击进入频道</span>
          </div>
          <div className="title-right">
            {toggleEditAndDone ? (
              <Button className="edit" onClick={handleEditChannels}>
                编辑
              </Button>
            ) : (
              <Button className="done" onClick={handleEditChannelsDone}>
                完成
              </Button>
            )}
          </div>
        </div>
        <div className="list">
          {channelsList.map((channel) => (
            <div
              className="item"
              key={channel.id}
              onClick={() => handleChangeChannel(`${channel.id}`)}
            >
              <span className={channel.id == +channelActiveKey ? "active" : ""}>
                {channel.name}
              </span>
              {!toggleEditAndDone ? (
                <i>
                  <CloseCircleFill
                    onClick={(event) => handleRemoveChannels(event, channel)}
                  />
                </i>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="channels">
        <div className="title">
          <div className="title-left">
            <span className="my-channels">可选频道：</span>
          </div>
        </div>
        <div className="list">
          {allChannelsList.map((channel) => (
            <div
              className="item"
              key={channel.id}
              onClick={() => handleAddChannel(channel)}
            >
              <span>+ {channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
}

export default ChannelsPopupComp;
