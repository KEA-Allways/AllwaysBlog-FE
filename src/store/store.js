import {create} from "zustand";
import {devtools} from "zustand/middleware"

// user, blog
export const loginStore = create(devtools(set =>({
    userSeq : 0,
    userId : "",
    password : "",
    userName : "",
    profileImg : "",

    setUserSeq : (userSeq) => set({userSeq}),
    setUserId : (userId) => set({userId}),
    setPassword : (password) => set({password}),
    setUserName : (userName) => set({userName}),
    setProfileImg : (profileImg) => set({profileImg}),

})))

export const blogStore = create(devtools(set => ({
    blogName : "",
    blogDescription : "",

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
    setThemes : (themes) => {
        set({themes});
    }
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