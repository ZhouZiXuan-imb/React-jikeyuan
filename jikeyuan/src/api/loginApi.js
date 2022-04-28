import {requestWidthOutToken} from "../utils/request"

export function loginApi({mobile, code}) {
    return requestWidthOutToken.post("/authorizations", {mobile, code})
}