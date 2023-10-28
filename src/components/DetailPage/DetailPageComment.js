import React from 'react';
import { TextField, Typography, Divider, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const DetailPageComment = ({ comments, onCommentSubmit, onCommentChange, comment }) => {
  return (
    <div>
      <Typography variant="h6">댓글 {comments.length}</Typography>
      <Divider />
      <TextField
        fullWidth
        label="댓글을 입력하세요"
        id="fullWidth"
        value={comment}
        onChange={onCommentChange}
        sx={{ marginTop: "15px" }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onCommentSubmit}
        >
          등록
        </Button>
      </div>
      <List sx={{ width: '100%', maxWidth: 720, bgcolor: '#f4f4f4' }}>
        {comments.map((comment, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="User" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.nickname}
                secondary={comment.replyContent}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

export default DetailPageComment;