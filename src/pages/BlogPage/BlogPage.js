import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogBody from "../../components/Body/BlogBody";
import BlogTopbar from "../../components/Topbar/BlogTopbar";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";


const BlogPage = () => {
    return (
        <div>
            <BlogTopbar />
            <Row>
                <Col md={2}>
                    <BlogSidebar />
                </Col>
                <Col md={1}>
                    
                </Col>
                <Col md={8}>
                    <BlogBody />
                </Col>
            </Row>
            
        </div>
    )
}

export default BlogPage;