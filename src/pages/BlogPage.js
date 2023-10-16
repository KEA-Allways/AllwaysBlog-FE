import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogTopbar from "../components/BlogTopbar";
import BlogBody from "../components/BlogBody";
import BlogSidebar from "../components/BlogSidebar";
import Footer from "../components/Footer";

const BlogPage = () => {
    return (
      <div>
        <BlogTopbar />
        <hr />
        <Row>
          <Col md={2}>
            <BlogSidebar />
          </Col>
          <Col md={10}>
            <BlogBody />
          </Col>
        </Row>
         <Footer />
      </div>
    );
  };

export default BlogPage;