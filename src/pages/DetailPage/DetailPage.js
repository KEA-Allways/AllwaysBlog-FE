import React from 'react';
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';
import DetailPageBody from "../../components/DetailPage/DetailPageBody"
import styles from "./DetailPage.module.css";
import { useParams } from 'react-router-dom';


const DetailPage = () => {
    const { postSeq } = useParams();
    return (
        <div className={styles.detail}>
            <BlogTopSideBar body={<DetailPageBody postSeq={postSeq} />}/>
             
        </div>
    )
}

export default DetailPage;