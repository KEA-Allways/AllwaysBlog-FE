import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import ThumbnailModal from "../ThumbnailModal/ThumbnailModal.js"

const Container = styled.div`
  width: 100%;
`;

const PostEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  //모달 상태 추가 
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (bool) => {
    setShowModal(!showModal);
    ThumbnailModal(bool)
    console.log('Modal toggled:', showModal); 
  };
  const handlePostComplete = () => {
    setShowModal(true); // 작성 완료 버튼 클릭 시 모달 표시
    console.log('Post complete button clicked');  // 확인용 로그
  };
  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  return (
    <>
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
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
      </Container>
      <button onClick={()=>setShowModal(true)}>작성 완료</button>
      <ThumbnailModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PostEditor;