import {create} from "zustand";

export const loginStore = create(set =>({
    userId : "",
    password : "",
    isLogin : false,
    blogName : "",
    userName : "",
    user : {},
    profileImg : "",

    setUserId : (userId) => {
        set({userId});
        localStorage.setItem('userId', userId);
    },
    setPassword : (password) => set({password}),
    setIsLogin : (isLogin) => {
        set({isLogin});
        localStorage.setItem('isLogin', isLogin);
    },
    setBlogName : (blogName) => {
        set({blogName});
        localStorage.setItem('blogName', blogName);
    },
    setUserName : (userName) => {
        set({userName});
        localStorage.setItem('userName', userName);
    },
    setUser : (user) => {
        set({user});
        localStorage.setItem('user', JSON.stringify(user));
    },
    setProfileImg : (profileImg) => {
        set({profileImg});
        localStorage.setItem('profileImg', profileImg);
    },
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