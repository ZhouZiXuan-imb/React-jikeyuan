import {requestWidthOutToken, requestWidthToken} from "../utils/request";

export function getChannels() {
    return requestWidthOutToken.get("/channels")
}

export async function getArticles(data) {
    return requestWidthToken.get("/mp/articles", {...data})
}

export function delArticle(id) {
    return requestWidthToken.delete(`/mp/articles/${id}`)
}

export function publishArticle({data, draftType = false}) {
    return requestWidthToken.post(`/mp/articles?draft=${draftType}`, data)
}

export function getArticle(id) {
    return requestWidthToken.get(`/mp/articles/${id}`)
}

export function editArticle({id, data, draftType = false}) {
    return requestWidthToken.put(`/mp/articles/${id}?draft=${draftType}`, data)
}