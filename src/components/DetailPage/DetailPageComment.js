import React from 'react';
import { TextField, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import styled from "@emotion/styled";
import { CommonButton } from '../../common';
import styles from "./DetailPageBody.module.css";

const DetailPageComment = ({ comments, onCommentSubmit, onCommentChange, comment }) => {
  return (
    <div className={styles.contentBox}>
      <Typography variant="h6"> 댓글 {comments.length}</Typography>
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
        {comments.map((comment, index) => (
          <div key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src= {comment.profileImg} alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.nickname}
                secondary={comment.replyContent}
              />
              <Typography variant="p" style={{marginTop: 30}}> {comment.replyDate}</Typography>
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