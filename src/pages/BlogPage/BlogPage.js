import React, { useEffect, useState } from 'react';
import BlogBody from "../../components/Body/BlogBody";
import styles from "./BlogPage.module.css";
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';
import { DefaultAxios } from '../../lib/DefaultAxios';
import { blogPostStore, blogStore, defaultBlogStore, loginStore, themeListStore } from '../../store/store';
import { TokenAxios } from '../../lib/TokenAxios';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
    const {setBlogPosts, setTotalElements, setTotalPages} = blogPostStore(state => state);
    const {userName,setUserName} = loginStore(state => state);
    const {setThemes} = themeListStore(state => state);
    const {setBlogProfileImg} = blogStore(state => state);
    const {blogInfo, setBlogInfo} = defaultBlogStore(state => state);
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    // 사이드바 가져오는 코드 (테마, 카테고리)
    const getThemeAndCategory = async() => {
        try{
            const res = await DefaultAxios.get(`/api/theme/list/${params.userSeq}`);
            const data = res.data.result.data;
            // console.log(data);
            setThemes(data);
        }catch(e){
            console.log(e);
        }
    }

    // 바디의 데이터
    // 그러면 카테고리Seq 전달해주고 썸네일이미지, 게시글제목, 게시글 요약, 작성자이미지, 작성자 닉네임, 작성일자를 전부 가져오면 돼.
    // 카테고리 Seq를 전달해줘서 카테고리의 모든 작성글 가져오는 코드
    const getCategoryPost = async() => {
        try{
            const res = await DefaultAxios.get(`/api/post/user/${params.userSeq}/category/${params.categorySeq}?page=1&size=10`);
            const data = res.data.result.data;
            // console.log(data);
            setBlogPosts(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        }catch(e){
            console.log("Error : " + e);
        }
    }

    const getUserBlog = async () => {
        try{
            const res = await DefaultAxios.get(`/api/blog/${params.userSeq}`)
            const data = res.data.result.data;
            // console.log(data);
            setBlogInfo(data);
            setUserName(data.nickname);
            const response = await axios.get(`http://localhost:8001/receive_profile/${params.userSeq}`)
            console.log(response.data.profileImg);
            setBlogProfileImg(response.data.profileImg);
        }catch(e){
            console.log("getUserBlog에러 " + e);
        }
    }

    useEffect(() => {
        getThemeAndCategory();
    },[])

    useEffect(() => {
        getUserBlog();
        getCategoryPost();
    },[params.categorySeq])

    return (
        <div className={styles.blog}>
            {userName 
            ? <BlogTopSideBar currentPage={currentPage} body={<BlogBody currentPage={currentPage} setCurrentPage={setCurrentPage} />}/> 
            : <div style={{height : "100vh"}}></div>
            }
        </div>
    )
}

export default BlogPage;