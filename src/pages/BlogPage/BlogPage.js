import React, { useEffect } from 'react';
import BlogBody from "../../components/Body/BlogBody";
import styles from "./BlogPage.module.css";
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';
import { DefaultAxios } from '../../lib/DefaultAxios';
import { blogPostStore, loginStore } from '../../store/store';
import { TokenAxios } from '../../lib/TokenAxios';

const BlogPage = () => {
    
    const {setBlogPosts} = blogPostStore(state => state);


    // 사이드바 가져오는 코드 (테마, 카테고리)
    const getThemeAndCategory = async() => {
        try{
            const res = await TokenAxios.get("/api/theme/list");
            console.log(res.data);
        }catch(e){
            console.log(e);
        }
    }


    // 바디의 데이터
    // 그러면 카테고리Seq 전달해주고 썸네일이미지, 게시글제목, 게시글 요약, 작성자이미지, 작성자 닉네임, 작성일자를 전부 가져오면 돼.
    // 카테고리 Seq를 전달해줘서 카테고리의 모든 작성글 가져오는 코드
    const getCategoryPost = async() => {
        try{
            const res = await DefaultAxios.get("/api/post/user/3/category/1?page=1&size=20");
            setBlogPosts(res.data.result.data.content);
        }catch(e){
            console.log("Error : " + e);
        }
    }

    

    useEffect(() => {
        getThemeAndCategory();
        getCategoryPost();
    },[])

    return (
        <div className={styles.blog}>
            
            <BlogTopSideBar body={<BlogBody />}/>
        </div>
    )
}

export default BlogPage;