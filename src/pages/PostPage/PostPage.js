import React from 'react';
import BlogTopbar from "../../components/Topbar/BlogTopbar"
import PostEditor from "../../components/PostEditor/PostEditor"
import { Row, Col } from 'react-bootstrap';

const PostPage = () => {
    return (
      <div>
        <BlogTopbar />
        <Row>
          <Col md={1}></Col>
          <Col md={10}>

          <PostEditor />
          </Col>
          <Col md={1}></Col>
        </Row>
        
      </div>
    );
  };

export default PostPage;