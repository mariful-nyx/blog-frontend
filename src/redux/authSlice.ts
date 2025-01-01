import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'

interface AuthType {
    token: string;
    isLoggedIn: boolean;
}

const initialState: AuthType = {
    token: Cookie.get('accessToken') || '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        auth:(state, action)=>{
            state=action.payload
        }
    }
})

export const { auth } = authSlice.actions

export default authSlice.reducer