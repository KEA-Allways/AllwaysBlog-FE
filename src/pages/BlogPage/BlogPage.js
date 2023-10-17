import BlogTopSideBar from "../../components/TopSidebar/BlogTopSideBar";
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogBody from "../../components/Body/BlogBody";
import Topbar from "../../components/Topbar/Topbar";
import BlogTopbar from "../../components/Topbar/BlogTopbar";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./BlogPage.module.css"


const BlogPage = () => {
    return (
        <div>
            <BlogTopbar />
            <Row md={2}>
                <Col md={2}>
                    <BlogSidebar />
                </Col>
                <Col md={1}>
                    
                </Col>
                <Col md={8}>
                    <BlogBody/>
                </Col>
            </Row>
            
        </div>
    )
}

export default BlogPage;