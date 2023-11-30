import {create} from "zustand";


// user, blog
export const loginStore = create(set =>({
    userSeq : 0,
    userId : "",
    userName : "",
    profileImg : "",

    setUserId : (userId) => {
        set({userId});
        localStorage.setItem('userId', userId);
    },
    
    setUserName : (userName) => {
        set({userName});
        localStorage.setItem('userName', userName);
    },
    setProfileImg : (profileImg) => {
        set({profileImg});
        localStorage.setItem('profileImg', profileImg);
    },
    setUserSeq : (userSeq) => {
        set({userSeq});
        localStorage.setItem('userSeq',userSeq);
    }
 


}))

export const blogStore = create(set => ({
     
    blogName : "",
    blogDescription : "",

    
    setBlogName: (blogName) => {
        set({blogName});
        localStorage.setItem("blogName",blogName)
    },
    setBlogDescription : (blogDescription) => {
        set({blogDescription});
        localStorage.setItem("blogDescription",blogDescription)
    }
     
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