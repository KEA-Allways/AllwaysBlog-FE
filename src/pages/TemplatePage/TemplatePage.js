import React from 'react';
import { useLocation } from "react-router-dom";
import PostEditor from "../../components/PostEditor/PostEditor"
import { Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar/Topbar';

const TemplatePage = () => {
  const location = useLocation();
  console.log(location);
  
  const templateSeq = location.state.templateSeq;

    return (
      <div>
        <Topbar />
        <Row>
          <Col md={1}></Col>
          <Col md={10}>

            <PostEditor templateSeq={templateSeq}/>
          </Col>
          <Col md={1}></Col>
        </Row>
        
      </div>
    );
  };

export default TemplatePage;