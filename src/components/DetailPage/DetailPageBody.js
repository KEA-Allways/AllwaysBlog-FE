import React, { useState,useEffect } from 'react';
import { useLocation ,useParams} from 'react-router-dom';
import DetailPageContent from "./DetailPageContent"
import DetailPageComment from './DetailPageComment';
import { Container, Row, Col } from 'react-bootstrap';
 
const  DetailPage=(props) => {
    const { postSeq } = props;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
   
    return (
      <Container>
        <Row className='my-5'>
          <Col md={2}></Col>
          <Col md={8}>
            <div>
              <DetailPageContent postSeq={postSeq}/>
            </div>
            <div>
              <DetailPageComment  postSeq={postSeq}/>
            </div>
          </Col>
          <Col md={2}></Col>

        </Row>

      </Container>
            
    );
}

export default DetailPage;