import {create} from "zustand";

const loginStore = create(set =>({
    userId : "",
    password : "",
    isLogin : false,
    hasBlog : false,
    username : "",
    user : {},

    setUserId : (userId) => set({userId}),
    setPassword : (password) => set({password}),
    setIsLogin : (isLogin) => set({isLogin}),
    setHasBlog : (hasBlog) => set({hasBlog}),
    setUsername : (username) => set({username}),
    setUser : (user) => set({user}),
}))

export default loginStore;