import {useEffect, useState} from "react";

function isAuth() {
    const token = localStorage.getItem("jky-token") || ""
    if (token) {
        return Promise.resolve();
    }
    return Promise.reject();
}

function useAuth() {
    // 声明用于存储守卫状态的状态
    const [auth, setAuth] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isAuth()
            // 如果isAuth返回的是成功的Promise
            .then(() => {
                setAuth(true);
            })
            // 如果isAuth返回的是失败的Promise
            .catch((error) => {
                setAuth(false);
            })
            // 不管返回的是什么状态，都要停止loading状态
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return {
        auth,
        loading
    }
}

export default useAuth;