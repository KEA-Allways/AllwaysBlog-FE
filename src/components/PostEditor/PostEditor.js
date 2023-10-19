import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import ThumbnailModal from "../ThumbnailModal/ThumbnailModal.js";
import { TextField } from '@mui/material/';
import { MenuItem } from '@mui/material/';

const Container = styled.div`
  width: 100%;
`;

const PostEditor = ({ postSeq }) => {
  // 에디터 상태(Content 상태) 추가
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // 제목 상태 추가
  const [titleState, setTitleState] = useState("");

  const [htmlString, setHtmlString] = useState("");
  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (bool) => {
    setShowModal(!showModal);
    ThumbnailModal(bool);
    console.log('Modal toggled:', showModal);
  };
  const handlePostComplete = () => {
    setShowModal(true); // 작성 완료 버튼 클릭 시 모달 표시
    console.log('Post complete button clicked'); // 확인용 로그
  };
  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };
  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  // 임시 카테고리 목록들 저장된 리스트
  const currencies = [
    {
      value: '카테고리1'
    },
    {
      value: '카테고리2'
    },
    {
      value: '카테고리3'
    },
    {
      value: '카테고리4'
    },
  ];

  const apiGetPost = () => {
    axios.get('http://private-anon-474957104d-bee3083.apiary-mock.com/posts/postSeq')
    .then((response) => {
      console.log(response.data);
      const blocksFromHTML = convertFromHTML(response.data.content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
      const initialEditorState  = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState );
      setTitleState(response.data.title);
    })
    .catch((error) => {
      console.error('API GET request error:', error);
    });
  }

  useEffect(() => {
    if(postSeq == 0) {
      setTitleState("게시글 제목")
    }
    if(postSeq !== 0) {
      apiGetPost();
    }
  }, [postSeq]);

  return (
    <>
      <div style={{ marginTop: '30px', marginBottom: '15px' }}>
        <TextField
          id="post-category"
          select
          label="게시글 카테고리"
          value={postSeq === 0 ? '카테고리1' : titleState}
          style={{ width: 'auto' }}>
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div style={{ marginTop: '15px', marginBottom: '30px' }}>
        <TextField
          id="post-title"
          label="게시글 제목"
          variant="outlined"
          value={postSeq === 0 ? '미리 지정한 제목' : titleState}
          style={{ width: '100%' }}>
        </TextField>
      </div>

      <Container>
        <Editor
          placeholder="게시글을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "400px",
            width: "100%",
            border: "3px solid lightgray"
          }}
        />
      </Container>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div></div>
        <button style={{ marginTop: '30px' }} onClick={() => setShowModal(true) }>작성 완료</button>
      </div>
      <ThumbnailModal
        showModal={showModal}
        onClose={() => setShowModal(false)} />
    </>
  );
};

export default PostEditor;