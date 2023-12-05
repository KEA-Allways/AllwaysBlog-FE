import React from 'react';
import { useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar/Topbar';
import TemplateEditor from '../../components/TemplateEditor/TemplateEditor';

const TemplatePage = () => {

    return (
      <div>
        <Topbar />
        <Row>
          <Col md={1}></Col>
          <Col md={10}>

            <TemplateEditor/>
          </Col>
          <Col md={1}></Col>
        </Row>
        
      </div>
    );
  };

export default TemplatePage;