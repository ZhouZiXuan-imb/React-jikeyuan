import { requestWidthOutToken } from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginRequestParams } from "@/types/login";

export function getLoginCode<T>({
  mobile,
}: {
  mobile: string;
}): AxiosPromise<T> {
  return requestWidthOutToken.get(`/sms/codes/${mobile}`);
}

export function login<T>({
  mobile,
  code,
}: LoginRequestParams): AxiosPromise<T> {
  return requestWidthOutToken.post("/authorizations", { mobile, code });
}