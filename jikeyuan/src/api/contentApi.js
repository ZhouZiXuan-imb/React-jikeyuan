import {requestWidthOutToken, requestWidthToken} from "../utils/request";

export function getChannels() {
    return requestWidthOutToken.get("/channels")
}

export function getArticles(payload) {
    return requestWidthToken.get("/mp/articles", {...payload})
}

export function delArticle(id) {
    return requestWidthToken.delete(`/mp/articles/${id}`)
}