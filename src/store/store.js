import {create} from "zustand";
import {devtools} from "zustand/middleware"

// user, blog
export const loginStore = create(devtools(set =>({
    userSeq: 0,
    userId: "",
    password: "",
    userName: "",
    profileImg: "",

    // 각각의 상태가 변경될 때 로컬 스토리지 업데이트
    setUserSeq: (userSeq) => {
        set({ userSeq });
        localStorage.setItem('userSeq', JSON.stringify(userSeq));
    },
    setUserId: (userId) => {
        set({ userId });
        localStorage.setItem('userId', userId);
    },
    setPassword: (password) => {
        set({ password });
        localStorage.setItem('password', password);
    },
    setUserName: (userName) => {
        set({ userName });
        localStorage.setItem('userName', userName);
    },
    setProfileImg: (profileImg) => {
        set({ profileImg });
        localStorage.setItem('profileImg', profileImg);
    },
})));

export const blogStore = create(devtools(set => ({
    blogSeq : 0,
    blogName : "",
    blogDescription : "",

    setBlogSeq : (blogSeq) => set({blogSeq}),
    setBlogName : (blogName) => set({blogName}),
    setBlogDescription : (blogDescription) => set({blogDescription}),
})))

export const defaultBlogStore = create(devtools(set => ({
    blogInfo : [],

    setBlogInfo : (blogInfo) => set({blogInfo}),
})))

// theme, category
export const themeListStore = create(devtools(set =>({
    themeSeq : 0,
    themeNames : [],
    themes : [],

    setThemeNames : (themeName) => set({ themeNames : themeName}),
    addTheme: (newTheme) => set((state) => ({ themeNames: [...state.themeNames, newTheme] })),
    setThemes : (themes) => set({themes}), 
})))

// post
export const mainPostStore = create(devtools(set => ({
    tenPosts : [],

    setTenPosts : (tenPosts) => set({tenPosts : tenPosts}),
})))


export const blogPostStore = create(devtools(set => ({
    blogPosts : [],
    totalElements : 0,
    totalPages : 0,
    currentPage : 1,

    setBlogPosts : (blogPosts) => set({blogPosts : blogPosts}),
    setTotalElements : (totalElements) => set({totalElements : totalElements}),
    setTotalPages : (totalPages) => set({totalPages : totalPages}),
    setCurrentPage : (currentPages) => set({currentPages : currentPages}),
})))
    