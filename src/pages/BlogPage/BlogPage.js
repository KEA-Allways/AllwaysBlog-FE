import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogBody from "../../components/Body/BlogBody";
import BlogBody2 from '../../components/Body/BlogBody2';
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import Sidebar from '../../components/Sidebar/BlogSidebar';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styles from "./BlogPage.module.css";
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';

const BlogPage = () => {
    return (
        <div className={styles.blog}>
            <BlogTopSideBar body={<BlogBody />}/>
            {/* <Routes>
                <Route path="/blogs/themes/:theme_id" element={<BlogTopSideBar body={<BlogBody />} /> } />
                <Route path="/blogs/themes/1/list/1" element={<BlogTopSideBar body={<BlogBody />} /> } />
            </Routes> */}
        </div>
    )
}

export default BlogPage;