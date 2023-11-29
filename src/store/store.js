import {create} from "zustand";


// user, blog
export const loginStore = create(set =>({
    userSeq : 0,
    userId : "",
    password : "",
    userName : "",
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
    setUserSeq : (userSeq) => set({userSeq}),
    setUserId : (userId) => set({userId}),
    setPassword : (password) => set({password}),
    setUserName : (userName) => set({userName}),
    setProfileImg : (profileImg) => set({profileImg}),

}))

export const blogStore = create(set => ({
    blogSeq : 0,
    blogName : "",
    blogDescription : "",

    setBlogSeq : (blogSeq) => set({blogSeq}),
    setBlogName : (blogName) => set({blogName}),
    setBlogDescription : (blogDescription) => set({blogDescription}),
}))


// theme, category
export const themeListStore = create(set =>({
    themeSeq : 0,
    themeNames : [],
    setThemeNames : (themeName) => set({ themeNames : themeName}),
    addTheme: (newTheme) => set((state) => ({ themeNames: [...state.themeNames, newTheme] })),
}))


// post
export const mainPostStore = create(set => ({
    tenPosts : [],

    setTenPosts : (tenPosts) => set({tenPosts : tenPosts}),
}))

export const blogPostStore = create(set => ({
    blogPosts : [],

    setBlogPosts : (blogPosts) => set({blogPosts : blogPosts}),
}))