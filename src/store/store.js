import {create} from "zustand";

export const loginStore = create(set =>({
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

export const themeListStore = create(set =>({
    themeSeq : 0,
    themeNames : [],
    setThemeNames : (themeName) => set({ themeNames : themeName}),
    addTheme: (newTheme) => set((state) => ({ themeNames: [...state.themeNames, newTheme] })),
}))