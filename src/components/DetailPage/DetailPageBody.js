import React, { useState,useEffect } from 'react';
import { useLocation ,useParams} from 'react-router-dom';
import axios from "axios";
import DetailPageContent from "./DetailPageContent"
import DetailPageComment from './DetailPageComment';
import { Container, Row, Col } from 'react-bootstrap';
 
const  DetailPage=(props) => {
    const { postSeq } = props;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    //댓글 현재 값 
    const [comment, setComment] = useState('');

    //모든 댓글 배열 저장 
    const [replyList, setReplyList] = useState([]);

    //입력 필드값 변경될 때 호출 
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {

      // if (comment.trim() !== '') {
      //   // API 엔드포인트를 통해 댓글 추가하는 요청 보내기
      //   try {
      //     const response =   {
      //       "userId": "testId",
      //       "replySeq": `${comments.length}`,
      //       "nickname": "우디",
      //       "replyDate": "2023-10-31",
      //       "profileImg" : "https://allways-image.s3.ap-northeast-2.amazonaws.com/test-img/icon/woody.png",
      //       "replyContent": `${comment}`
      //     };
          
           
      //     //const newComments = [...comments, response];

      //     //setComments(newComments);
      //     setComment('');
            
          
      //   } catch (error) {
      //     console.error('API POST request error:', error);
      //   }
      // }
      
    };

  

    const apiGetReplies = () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}/reply`,
        headers: {
          'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
        },
        responseType: "json",
      })
      .then((response) => {
        setReplyList(response.data.result.data)
      }).catch((error) => {
        console.error('API GET request error:', error);
      });
    }


    
    useEffect(() => {
      apiGetReplies();
    }, []);

     

    return (
      <Container>
        <Row className='my-5'>
          <Col md={2}></Col>
          <Col md={8}>
            <div>
              <DetailPageContent postSeq={postSeq}/>
            </div>
            <div>
              <DetailPageComment  comment={comment}
                                  comments={replyList}
                                  onCommentSubmit={handleCommentSubmit}
                                  onCommentChange={handleCommentChange}
                                  
              />
            </div>
          </Col>
          <Col md={2}></Col>

        </Row>

      </Container>
            
    );
}

export default DetailPage;