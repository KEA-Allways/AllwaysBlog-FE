import React, { useState,useEffect } from 'react';
import { useLocation ,useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { TextField ,Typography,Divider,Button,List,ListItem
,ListItemAvatar,Avatar,ListItemText} from '@mui/material';
import axios from "axios";
import DetailPageContent from "./DetailPageContent"
import DetailPageComment from './DetailPageComment';
 

const apiUrl=`${process.env.REACT_APP_API_URL}/api/posts/1/replys`
const  DetailPage=() => {
    const location = useLocation();
    const { title } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const imgUrl = searchParams.get('imgUrl');
    
    //댓글 현재 값 
    const [comment, setComment] = useState('');
    //모든 댓글 배열 저장 
    const [comments, setComments] = useState([]);

    //입력 필드값 변경될 때 호출 
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
      if (comment.trim() !== '') {
        // API 엔드포인트를 통해 댓글 추가하는 요청 보내기
        try {
          const response =   {
            "userId": "testId",
            "replySeq": `${comments.length}`,
            "nickname": "젤리조아",
            "replyDate": "2023-10-12",
            "replyContent": `${comment}`
          };
          
           
          const newComments = [...comments, response];

          setComments(newComments);
          setComment('');
            
          
        } catch (error) {
          console.error('API POST request error:', error);
        }
      }
      
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(apiUrl);
        setComments(response.data.replys);
      } catch (error) {
        console.error('API GET request error:', error);
      }
    };

    
    useEffect(() => {
      fetchComments();
    }, []);

     

    return (
      <div style={{background : "rgba(255,255,255,0.3)", backdropFilter: "blur(5.5px)" }}>
      <Grid container spacing={1}>
        {/* 빈공간 */}
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          {/* 썸네일 과 본문 보여주기  */}
          <DetailPageContent title={title} imgUrl={imgUrl} />
          {/* 댓글 관련 */}
          <DetailPageComment 
            comments={comments}
            onCommentSubmit={handleCommentSubmit}
            onCommentChange={handleCommentChange}
            comment={comment}/>
        
        </Grid>

        {/* 빈공간 */}
        <Grid item xs={2}>
        </Grid>
      </Grid>
 
      </div>
            
 
         
    );
}

export default DetailPage;