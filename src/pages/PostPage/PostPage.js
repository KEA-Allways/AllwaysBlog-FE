import React from 'react';
import { useLocation } from "react-router-dom";
import PostEditor from "../../components/PostEditor/PostEditor"
import { Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar/Topbar';

const PostPage = () => {
  const location = useLocation();
  const postSeq = location.state.postSeq;

    return (
      <div>
        <Topbar />
        <Row>
          <Col md={1}></Col>
          <Col md={10}>

            <PostEditor postSeq={postSeq}/>
          </Col>
          <Col md={1}></Col>
        </Row>
        
      </div>
    );
  };

export default PostPage;