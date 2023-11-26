import {create} from "zustand";

export const loginStore = create(set =>({
    userId : "",
    password : "",
    isLogin : false,
    blogName : "",
    userName : "",
    user : {},
    profileImg : "",

    setUserId : (userId) => set({userId}),
    setPassword : (password) => set({password}),
    setIsLogin : (isLogin) => set({isLogin}),
    setBlogName : (blogName) => set({blogName}),
    setUserName : (userName) => set({userName}),
    setUser : (user) => set({user}),
    setProfileImg : (profileImg) => set({profileImg}),
}))

export const themeListStore = create(set =>({
    themeSeq : 0,
    themeNames : [],
    setThemeNames : (themeName) => set({ themeNames : themeName}),
    addTheme: (newTheme) => set((state) => ({ themeNames: [...state.themeNames, newTheme] })),
}))

export const mainPostStore = create(set => ({
    // postSeq : "",
    // thumbImg : "",
    // ListName : "",
    // nickname : "",
    // postDate : "",
    // postProfileImg : "",
    // subtitle : "",
    // themeName : "",
    // title : "",
    // userId : "",
    tenPosts : [],

    setTenPosts : (tenPosts) => set({tenPosts : tenPosts}),
    // setPostSeq : (postSeq) => set({postSeq}),
    // setThumbImg : (thumbImg) => set({thumbImg}),
    // setListName : (ListName) => set({ListName}),
    // setNickname : (nickname) => set({nickname}),
    // setPostDate : (postDate) => set({postDate}),
    // setPostProfileImg : (postProfileImg) => set({postProfileImg}),
    // setSubtitle : (subtitle) => set({subtitle}),
    // setThemeName : (themeName) => set({themeName}),
    // setTitle : (title) => set({title}),
    // setUserId : (userId) => set({userId}),

}))