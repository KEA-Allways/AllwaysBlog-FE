import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogBody from "../../components/Body/BlogBody";
import BlogBody2 from '../../components/Body/BlogBody2';
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import Sidebar from '../../components/Sidebar/BlogSidebar';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import BlogTopSideBar from '../../components/TopSidebar/BlogTopSideBar';

const BlogPage = ({ match, location, history}) => {
    return (
        <>
            <BlogTopSideBar body={<BlogBody2 />}/>
            {/* <Routes>
                <Route path="/blogs/themes/:theme_id" element={<BlogTopSideBar body={<BlogBody />} /> } />
                <Route path="/blogs/themes/1/list/1" element={<BlogTopSideBar body={<BlogBody />} /> } />
            </Routes> */}
        </>
    )
}

export default BlogPage;