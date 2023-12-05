import React, { useEffect } from 'react';
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';
import DetailPageBody from "../../components/DetailPage/DetailPageBody"
import styles from "./DetailPage.module.css";
import { useParams } from 'react-router-dom';
import { DefaultAxios } from '../../lib/DefaultAxios';
import { themeStore } from '../../store/store';


const DetailPage = () => {
    const { postSeq, userSeq } = useParams();
    const {setThemes} = themeStore(state => state);

    // 사이드바 가져오는 코드 (테마, 카테고리)
    const getThemeAndCategory = async() => {
        try{
            const res = await DefaultAxios.get(`/api/theme/list/${userSeq}`);
            const data = res.data.result.data;
            // console.log(data);
            setThemes(data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getThemeAndCategory();
    })

    return (
        <div className={styles.detail}>
            <BlogTopSideBar body={<DetailPageBody postSeq={postSeq} />}/>
             
        </div>
    )
}

export default DetailPage;