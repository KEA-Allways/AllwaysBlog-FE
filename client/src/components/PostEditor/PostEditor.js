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
import { CommonButton } from "../../common";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TextStyles from "../../components/Text.module.css";

const Container = styled.div`
  width: 100%;
`;

const PostEditor = () => {
  const location = useLocation();

  const postSeq = location.state.postSeq;
  const theme = location.state.theme;

  const navigate = useNavigate();
  // 에디터 상태(Content 상태)
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // 제목 상태
  const [titleState, setTitleState] = useState("");

  const [themeState, setThemeState] = useState("");

  const [htmlString, setHtmlString] = useState("");
  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);
  // 카테고리 리스트 상태
  const [category_lists, setCategory_lists] = useState([]);
  // 카테고리 리스트 상태
  const [template_lists, setTemplate_lists] = useState([]);
  // 카테고리 선택 상태
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [showButton, setShowButton] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

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

  const apiGetPost = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts/postSeq`)
    .then((response) => {
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

  const apiGetCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/themes/1/1`)
    .then((response) => {
      setCategory_lists(response.data.category_lists);
    }).catch((error) => {
      console.error('API GET request error:', error);
    });
  }

  const apiGetTemplateList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/templates`)
    .then((response) => {
      setTemplate_lists(response.data.templates)
    }).catch((error) => {
      console.error('API GET request error:', error);
    });
  }

  const apiGetTemplate = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/templates/1`)
    .then((response) => {
      const blocksFromHTML = convertFromHTML(response.data.templateContent);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
      const initialEditorState  = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState );
      console.log(response.data.title)
      setTitleState(response.data.title);
    })
  }

  useEffect(() => {
    setThemeState(theme);
    if(postSeq === 0) {
      apiGetCategories();
      apiGetTemplateList();
      setShowButton("등록");
    }
    else if(postSeq !== 0) {
      apiGetPost()
      apiGetCategories();
      apiGetTemplateList();
      setShowButton("수정");
    }
  }, [postSeq]);

  useEffect(() => {
    if (selectedTemplate) {
      apiGetTemplate(selectedTemplate);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (category_lists.length > 0) {
      setSelectedCategory(category_lists[0].listName);
    }
  }, [category_lists]);

  return (
    <>
      <div style={{ marginTop: '30px', marginBottom: '15px' }}>
        <h3 className={TextStyles.h3}>
          {theme}
        </h3>
      </div>
      <div style={{ marginBottom: "20px"}}>
        <hr className={TextStyles.hr} />
      </div>
      <div style={{ marginBottom: '15px' }}></div>
      <div style={{ marginTop: '30px', marginBottom: '15px' }}>
      <TextField
        id="post-category"
        select
        label="게시글 카테고리"
        style={{ width: '20%' }}
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}>
          {category_lists.map((option) => (
            <MenuItem key={option.listName} value={option.listName}>
              {option.listName}
            </MenuItem>
          ))}
      </TextField>

      <TextField
        id="post-template"
        select
        label="게시글 서식"
        style={{ marginLeft: '5%' ,width: '20%' }}
        defaultValue = {{}}
        onChange={(event) => setSelectedTemplate(event.target.value)} >
        {template_lists.map((option) => (
          <MenuItem key={option.templateName} value={option.templateName}>
            {option.templateName}
          </MenuItem>
        ))}
      </TextField>
      </div>

      <div style={{ marginTop: '15px', marginBottom: '30px' }}>
        <TextField
          id="post-title"
          label="게시글 제목"
          variant="outlined"
          value={titleState}
          onChange={(event) => setTitleState(event.target.value)}
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
        {/* 수정이 아니라 처음 작성하러 들어왔을 때는 버튼을 하나만 보여주고 작성 완료 버튼을 누르면 썸네일 생성 창이 뜬다 */}
        {showButton === "등록" && (
          <CommonButton style={{ marginTop: '30px' }} onClick={() => setShowModal(true) }>작성 완료</CommonButton>
        )}
        {/* 수정하러 들어왔을 때는 버튼을 2개 보여준다, 작성 완료 버튼을 누르면 /mngt/content 페이지로 이동하게 해뒀는데 어느 유저의 mngt/page로 갈지는 차후에 설정해줘야 함 */}
        {showButton === "수정" && (
          <div>
          <CommonButton style={{ marginTop: '30px' }} onClick={() => setShowModal(true) }>썸네일 변경</CommonButton>
          <CommonButton style={{ marginTop: '30px' }} onClick={() => navigate('/mngt/content')}>작성 완료</CommonButton>
          </div>
        )}
      </div>
      <ThumbnailModal
        showModal={showModal}
        onClose={() => setShowModal(false)} />
    </>
  );
};

export default PostEditor;