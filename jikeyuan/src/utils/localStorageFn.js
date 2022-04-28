export const getLocalStorageToken = () => {
    return localStorage.getItem("jky-token")
}

export const setLocalStorageToken = (token) => {
    return localStorage.setItem("jky-token", token)
}

export const removeLocalStorageToken = () => {
    return localStorage.removeItem("jky-token")
}