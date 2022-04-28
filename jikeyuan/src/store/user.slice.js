import {createSlice} from "@reduxjs/toolkit";
// import {loginApi} from "../api/loginApi";

// export const login = createAsyncThunk("user/login", (payload) => {
//     try {
//         return loginApi({...payload})
//     } catch (err) {
//         throw new Error("登录失败")
//     }
// })

const {reducer: userLoginReducer} = createSlice({
    name: "userLogin",
    initialState: {},
    reducers: {
    },
    extraReducers: {
    }
})


export default userLoginReducer;