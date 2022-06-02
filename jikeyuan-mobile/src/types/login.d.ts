export type LoginCodeResponse = {
  data: null;
  message: string;
};

export type LoginRequestParams = {
  mobile: string;
  code: string;
};

export type LoginResponse = {
  token: string; // 用户token令牌
  refresh_token: string; // 用于刷新token的令牌
};
