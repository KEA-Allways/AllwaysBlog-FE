import {create} from "zustand";
import {devtools} from "zustand/middleware"

// user, blog
export const loginStore = create(devtools(set =>({
    userSeq: 0,
    userId: "",
    password: "",
    userName: "",
    profileImg: "",
    blogName : "",
    blogDescription : "",
    blogCreation:"",
    

    // 각각의 상태가 변경될 때 로컬 스토리지 업데이트
    setUserSeq: (userSeq) => {
        set({userSeq})
        localStorage.setItem('userSeq',userSeq)
    },
    setUserId: (userId) => {
        set({userId})
        localStorage.setItem('userId',userId)
    },
    
    setPassword: (password) => set({ password:password }),

    setUserName: (userName) => {
        set({userName});
        localStorage.setItem("userName", userName);
    },
    
    setProfileImg: (profileImg) => {
        set({ profileImg:profileImg });
        localStorage.setItem('profileImg', profileImg);
    },

    setBlogName : (blogName) => {
        set({blogName});
        localStorage.setItem("blogName", blogName);  
    },

    setBlogDescription : (blogDescription) => {
        set({blogDescription});
        localStorage.setItem("blogDescription", blogDescription);
    },
    setBlogCreation : (blogCreation ) => {
        set({blogCreation});
        localStorage.setItem("blogCreation",blogCreation);
    }

})));

export const blogStore = create(devtools(set => ({
    blogMasterName : "",
    blogSeq : 0,
    blogName : "",
    blogDescription : "",
    blogMasterProfileImg : "",

    setBlogMasterName : (blogMasterName) => set({blogMasterName}),
    setBlogSeq : (blogSeq) => set({blogSeq}),
    setBlogName : (blogName) => set({blogName}),
    setBlogDescription : (blogDescription) => set({blogDescription}),
    setBlogMasterProfileImg : (blogMasterProfileImg) => set({blogMasterProfileImg}),
})))

export const defaultBlogStore = create(devtools(set => ({
    blogInfo : [],

    setBlogInfo : (blogInfo) => set({blogInfo}),
})))

// theme, category
export const themeStore = create(devtools(set =>({
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
    categorySeq:0,

    setBlogPosts : (blogPosts) => set({blogPosts : blogPosts}),
    setTotalElements : (totalElements) => set({totalElements : totalElements}),
    setTotalPages : (totalPages) => set({totalPages : totalPages}),
    setCurrentPage : (currentPages) => set({currentPages : currentPages}),
    setCategorySeq : (categorySeq ) => set({categorySeq:categorySeq})
})))
    