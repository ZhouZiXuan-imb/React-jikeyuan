import React, { useEffect } from "react";
import { Grid, Image } from "antd-mobile";
import "./index.scss";
import {
  RightOutline,
  BellOutline,
  HeartOutline,
  ClockCircleOutline,
  BankcardOutline,
  QuestionCircleOutline,
  KoubeiFill,
} from "antd-mobile-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchUserInfo } from "@/store/asyncThunk/profile.thunk";
import { useNavigate } from "react-router";

function My() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  let { fans_count, follow_count, art_count, like_count, name, photo } =
    useAppSelector((state) => state.profile.userInfo);

  // 跳转到个人信息页面
  function goTOProfileInfoPage() {
    navigate("/profile-info");
  }

  return (
    <div className={"my"}>
      <div className="user-profile">
        <div className="info">
          <div className="photo">
            <Image width={44} height={44} fit={"cover"} src={photo} alt={""} />
          </div>
          <div className="username">{name}</div>
          <span onClick={goTOProfileInfoPage} className="info-detail">
            个人信息
            <RightOutline />
          </span>
        </div>

        <div className="profile-dynamic">
          <Grid columns={4}>
            <Grid.Item>
              <div>
                <p>{art_count}</p>
                <p>动态</p>
              </div>
            </Grid.Item>

            <Grid.Item>
              <div>
                <p>{follow_count}</p>
                <p>关注</p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div>
                <p>{fans_count}</p>
                <p>粉丝</p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div>
                <p>{like_count}</p>
                <p>被赞</p>
              </div>
            </Grid.Item>
          </Grid>
        </div>

        <div className="profile-message">
          <Grid columns={4}>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <BellOutline width={22} height={22} />
                </div>
                消息通知
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <HeartOutline width={22} height={22} />
                </div>
                我的收藏
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <ClockCircleOutline width={22} height={22} />
                </div>
                阅读历史
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <BankcardOutline width={22} height={22} />
                </div>
                我的作品
              </div>
            </Grid.Item>
          </Grid>
        </div>

        <div className="more">
          <p className="more-title">更多服务</p>
          <Grid columns={4}>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <QuestionCircleOutline width={22} height={22} />
                </div>
                用户反馈
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="message">
                <div className="tt-icon">
                  <KoubeiFill width={22} height={22} />
                </div>
                小智同学
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default My;
