import React, { useEffect, useState } from "react";
import { CommonColorButton, CommonDeleteButton } from "../../common";
import styled from "@emotion/styled";
import styles from "./DetailPageBody.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DetailPageContent =( props )=> {
  const { postSeq } = props;
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const editButtonClicked = ( postSeq ) => {
    //선택된 테마 seq 가져가도록 설정 필요
    const theme = '선택된 테마';
    navigate('/post', { state: { postSeq: postSeq, theme: theme } });
  };

  const apiGetPost = () => {
    axios
      .get(`${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}`)
      .then((response) => {
        setPost(response.data.result.data);
      })
      .catch((error) => {
        console.error('API GET request error: ', error);
      });
  };

  useEffect(() => {
    apiGetPost();
  },[postSeq]);
    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styled.thumbImgBox}>
              <img src={post.thumbImg} alt="게시글 썸네일" style={{ borderRadius: '15px', width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} />
            </div>
          </div>

          <div className={styles.contentBox}>

            <h1>{post.postTitle}</h1>

            <div style={{ display: 'flex',   alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <img src={post.profileImg} style={{width: '30px', height: '30px', marginRight: '10px'}} />
                {post.nickname} | {post.postDate} | 조회수 : {post.postView}
              </div>
              <div style={{ display: 'flex',   alignItems: 'center' }}>
                <EditButton onClick={() => editButtonClicked(post.postSeq)}>수정 </EditButton> 
                <DeleteButton>삭제</DeleteButton>
              </div>
            </div>
            
            <hr/>

            <ContentStyle dangerouslySetInnerHTML={{ __html: post.postContent }} />
          
          </div>
        </div>
      
    )
}

export default DetailPageContent

const EditButton = styled(CommonColorButton)`
  width: 20px;
  height: 40px;
  font-size: 12pt;
  margin-right: 10px;

`

const DeleteButton = styled(CommonDeleteButton)`
  width: 20px;
  height: 40px;
  font-size: 12pt;

`

const ContentStyle = styled.div`
  img {
    width : 100%;
    height : 100%;
    object-fit : cover;
  }
`