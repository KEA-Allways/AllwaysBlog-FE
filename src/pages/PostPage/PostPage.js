import React from 'react';
import { useLocation } from "react-router-dom";
import PostEditor from "../../components/PostEditor/PostEditor"
import { Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar/Topbar';

const PostPage = () => {
  const location = useLocation();
  // postSeq를 통해 현재 열려는 에디터가 새로운 게시글인지 아니면 어느 게시글인지 체크
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