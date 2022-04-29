import useAuth from "./useAuth";
import {Navigate} from "react-router";
import Loading from "@/components/Loading";

export default function AuthGuard({children}) {
    const {auth, loading} = useAuth();

    if (loading) return <><Loading/></>

    return auth ? children : <Navigate to={"/login"}></Navigate>
}