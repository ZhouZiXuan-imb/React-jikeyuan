import useAuth from "./useAuth";
import {Navigate} from "react-router";

export default function AuthGuard({children}) {
    const {auth, loading} = useAuth();

    if (loading) return <div>加载中...</div>

    return auth ? children : <Navigate to={"/login"}></Navigate>
}