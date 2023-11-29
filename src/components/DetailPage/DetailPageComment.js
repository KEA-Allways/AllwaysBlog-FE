import React, { useState, useEffect } from 'react';
import { TextField, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import styled from "@emotion/styled";
import { CommonButton } from '../../common';
import styles from "./DetailPageBody.module.css";
import axios from "axios";

const DetailPageComment = (props) => {
  const { postSeq } = props;

  //모든 댓글 목록
  const [replyList, setReplyList] = useState([]);

  //작성된 댓글 내용 
  const [comment, setComment] = useState('');

  //댓글 내용 세팅 함수
  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  //댓글 저장 함수
  const onCommentSubmit = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}/reply`,
      headers: {
        'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
      },
      data: {
        replyContent: comment,
      },
      responseType: "json",
    })
    .then((response) => {
      apiGetReplies();
      setComment('');
    }).catch((error) => {
      console.error('API GET request error:', error);
    });
  }

  //댓글 목록 조회 함수
  const apiGetReplies = () => {
    axios({
      method: "GET",
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
    <div className={styles.contentBox}>
      <Typography variant="h6"> 댓글 {replyList.length}</Typography>
      <Divider />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          fullWidth
          label="댓글을 입력하세요"
          id="fullWidth"
          value={comment}
          onChange={onCommentChange}
          sx={{ marginTop: "15px"}}
        />
        <CommentBtn onClick={onCommentSubmit}>
          등록
        </CommentBtn>
      </div>
      
      <List sx={{ width: '100%'}}>
        {replyList.map((reply, index) => (
          <div key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src= {reply.profileImg} alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary={reply.nickname}
                secondary={reply.replyContent}
                
              />
              <Typography variant="p" style={{marginTop: 30}}> {reply.createdAt}</Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

export default DetailPageComment;

const CommentBtn = styled(CommonButton)`
  width: 100px;
  height: 55px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 0px;
  line-height: 38px;
  font-size: 14px;
  border-radius: 5px;
  border: 0px solid white;

  &:hover {
    border: 1px solid black;
}
`;