import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ThumbnailModal from "../ThumbnailModal/ThumbnailModal.js";
import { TextField } from '@mui/material/';
import { MenuItem } from '@mui/material/';
import { CommonButton } from "../../common";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TextStyles from "../../components/Text.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";
import Swal from "sweetalert2";
import { DefaultAxios } from "../../lib/DefaultAxios.js";
import { TokenAxios } from "../../lib/TokenAxios.js";

const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
const REACT_APP_AWS_S3_BUCKET_NAME = process.env.REACT_APP_AWS_S3_BUCKET_NAME;


const PostEditor = () => {
  const location = useLocation();

  // navigate할 떄 담아오는 변수들
  const postSeq = location.state.postSeq;
  const templateSeq = location.state.templateSeq;
  const params = useParams();
  
  const navigate = useNavigate();

  // 게시글 제목
  const [titleState, setTitleState] = useState("");

  // 게시글 내용
  const [postContent, setPostContent] = useState("");

  // 테마 Seq
  const [themeSeq, setThemeSeq] = useState("");

  // 테마 이름
  const [themeName, setThemeName] = useState("");

  // 카테고리 목록
  const [categoryList, setCategoryList] = useState([]);

  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState("");

  // 템플릿 목록
  const [templateList, setTemplateList] = useState([]);

  // 선택된 템플릿 이름
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // 선택된 템플릿 Seq
  const [selectedTemplateSeq, setSelectedTemplateSeq] = useState("");

  const [templateShowState, setTemplateShowState] = useState(true);

  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);


  //modal 오픈 시 보낼 데이터
  const modalData = {
    showModal: showModal,
    onClose: () => setShowModal(false),
    postContent: postContent,
    postTitle: titleState,
    themeSeq: themeSeq //themeSeq 지정 필요
  };
  
  

  // 에디터 이미지 업로드 함수
  const quillRef = useRef(null);
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file 생성
      const file = input.files?.[0];
      try {
        //Date를 업로드할 파일의 이름으로 사용
        const name = Date.now();
        //s3 관련 설정
        AWS.config.update({
          region: REACT_APP_AWS_S3_BUCKET_REGION,
          accessKeyId: REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID,
          secretAccessKey: REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY,
          
        });
        //s3에 업로드할 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: REACT_APP_AWS_S3_BUCKET_NAME, //버킷 이름
            Key: `upload/${name}.${file.type.split("/")[1]}`,
            Body: file,
            ContentType: file.type,
          },
        });
        //이미지 업로드 url 반환
        const IMG_URL = await upload.promise().then((res) => res.Location);
        //useRef로 에디터의 현재 커서로 접근
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        //커서 위치에 이미지 삽입
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  useEffect(() => {
    if (postSeq !== undefined) {
      if (postSeq > 0) apiGetPost();
      apiGetTemplateList();
    }

    if (themeSeq !== undefined){
      apiGetCategories();
    }
  
    if (templateSeq !== undefined) {
      setTemplateShowState(false);
      
    } 
  }, [postSeq, themeSeq, templateSeq]);

  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategory(categoryList[0].categoryName);
    }
  }, [categoryList]);

  useEffect(() => {
    if (selectedTemplate) {
      apiGetTemplate(selectedTemplateSeq);
    }
  }, [selectedTemplateSeq]);

  

  // 게시글 상세 정보 가져오는 함수
  // const apiGetPost = () => {

  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}`,
  //     headers: {
  //       'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
  //     },
  //     responseType: "json",
  //   })
  //   .then((response) => {
  //     const data = response.data.result.data;
      
      // setPostContent(data.postContent);
      // setTitleState(data.postTitle);
      // setThemeSeq(data.themeSeq);
      // setThemeName(data.themeName);
      // console.log(themeSeq)
  //   })
  //   .catch((error) => {
  //     console.error('AxiosError: ', error);
  //   });
  // }

  const apiGetPost = () => {
    const res =TokenAxios.get(`api/post/${postSeq}`)
    const data =res.data.result.data;
    setPostContent(data.postContent);
    setTitleState(data.postTitle);
    setThemeSeq(data.themeSeq);
    setThemeName(data.themeName);
    
  }

  // 카테고리 목록 가져오는 함수
  const apiGetCategories = async () => {
    const res = await DefaultAxios.get(`/api/theme/${params.themeSeq}/category`)
    console.log("게시글 카테고리 목록");
    console.log(res);
    const data = res.data.result.data;
    console.log(data);
    setCategoryList(data);
  }

  // // 템플릿 목록 가져오는 함수
  // const apiGetTemplateList = () => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_GATEWAY_URL}/api/template`,
  //     headers: {
  //       'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
  //     },
  //     responseType: "json",
  //   })
  //   .then((response) => {
  //     console.log(response.data.result.data)
  //     setTemplateList(response.data.result.data)
  //   }).catch((error) => {
  //     console.error('API GET request error:', error);
  //   });
  // }

  const apiGetTemplateList = async() => {
    const res=await TokenAxios.get(`/api/template`)
    
    const data=res.data.result.data 
    setTemplateList(data)
     
  }

  // 템플릿 적용 함수
  // const apiGetTemplate = () => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_GATEWAY_URL}/api/template/${selectedTemplateSeq}`,
  //     headers: {
  //       'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
  //     },
  //     responseType: "json",
  //   })
  //   .then((response) => {
  //     const data = response.data.result.data;
  //     setPostContent(data.templateContent);
  //     setTitleState(data.templateTitle);
  //   }).catch((error) => {
  //     console.error('API GET request error:', error);
  //   });
    
  // }

  const apiGetTemplate = () => {

    const res =TokenAxios.get(`api/template/${selectedTemplateSeq}`);
    const data =res.data.result.data;
    setPostContent(data.templateContent)
    setTitleState(data.templateTitle)
     
    
  }

  // 템플릿 title, Seq 지정 함수
  const setTemplateInfo = (value) => {
    setSelectedTemplateSeq(value);
    setSelectedTemplate(value);
  }

  // 게시글 저장(수정 시 썸네일 모달 없이 바로 저장) 함수
  // const handlePostComplete = () => {
  //   axios({
  //     method: "PUT",
  //     url: `${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
  //     },
  //     data: {
  //       postTitle: titleState,
  //       postContent: postContent,
  //       categorySeq : 1
  //     },
  //     responseType: "json",
  //   })
  //   .then((response) => {
  //     const data = response.data.result.data;
  //     let resultSeq = 0;
  //     if (data.postSeq > 0){
  //       resultSeq = data.postSeq;

  //       Swal.fire({
  //         title: "게시글을 저장 중입니다.",
  //         timer: 3000,
  //         didOpen: () => {
  //           Swal.showLoading()
  //         }
  //       }).then(() => {
  //         navigate(`/post/${resultSeq}`);
  //       });
        
  //     } else {
  //       console.error('Error:', data.message);
  //       //문구 이상하면 변경 해주세용~
  //       alert("게시글을 저장하는데 오류가 발생했습니다.");
  //     }
  //   }).catch((error) => {
  //     console.error('API GET request error:', error);
  //   });
  // };

  const postPayload = {
      postTitle: titleState,
        postContent: postContent,
        categorySeq : 1
  };
  const handlePostComplete = () => {
    TokenAxios.put(`api/post/${postSeq}`,postPayload)
    .then((response) => {
      const data = response.data.result.data;
      let resultSeq = 0;
      if (data.postSeq > 0){
        resultSeq = data.postSeq;

        Swal.fire({
          title: "게시글을 저장 중입니다.",
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()
          }
        }).then(() => {
          navigate(`/post/${resultSeq}`);
        });
        
      } else {
        console.error('Error:', data.message);
        //문구 이상하면 변경 해주세용~
        alert("게시글을 저장하는데 오류가 발생했습니다.");
      }
    })
    .catch((error)=>{
      console.error('API PUT request error:', error);
      
    })

   
  };

  // axios({
  //   method: "PUT",
  //   url: `${process.env.REACT_APP_GATEWAY_URL}/api/post/${postSeq}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTYzOTA0LCJleHAiOjE3MDE3Njg3MDR9.JPW9GdiuLiCaKR6NzXibjTtTx8EXCnUyvierMoO0EsA`,
  //   },
  //   data: {
  //     postTitle: titleState,
  //     postContent: postContent,
  //     categorySeq : 1
  //   },
  //   responseType: "json",
  // })
  // .then((response) => {
  //   const data = response.data.result.data;
  //   let resultSeq = 0;
  //   if (data.postSeq > 0){
  //     resultSeq = data.postSeq;

  //     Swal.fire({
  //       title: "게시글을 저장 중입니다.",
  //       timer: 3000,
  //       didOpen: () => {
  //         Swal.showLoading()
  //       }
  //     }).then(() => {
  //       navigate(`/post/${resultSeq}`);
  //     });
      
  //   } else {
  //     console.error('Error:', data.message);
  //     //문구 이상하면 변경 해주세용~
  //     alert("게시글을 저장하는데 오류가 발생했습니다.");
  //   }
  // }).catch((error) => {
  //   console.error('API GET request error:', error);
  // });

  return (
    <>
    {templateShowState === true && (
      <>
      <div style={{ marginTop: '30px', marginBottom: '15px' }}>
        <h3 className={TextStyles.h3}>
          {themeName}
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
            {categoryList.map((option) => (
              <MenuItem key={option.categorySeq} value={option.categoryName}>
                {option.categoryName}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          id="post-template"
          select
          label="게시글 서식"
          style={{ marginLeft: '5%', width: '20%' }}
          value={selectedTemplate}
          onChange={(event) => {setTemplateInfo(event.target.value)}} >
            {templateList.map((option) => (
              <MenuItem key={option.templateSeq} value={option.templateSeq}>
                {option.templateTitle}
              </MenuItem>
            ))}
        </TextField>
      </div>
      </>
      )}

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

        <ReactQuill
          ref={quillRef}
          value={postContent}
          onChange={setPostContent}
          style={{ width: "100%", height: "600px" }}
          modules={modules}
          placeholder="게시글을 작성해주세요"
        />
 


      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div></div>
        {/* 게시글 생성 시 썸네일 생성 모달로 이동 후 내용 저장 */}
        {postSeq <= 0 && (
          <div style={{display: 'flex', marginTop: '30px'}}>
            <CommonButton style={{ marginTop: '30px' }} onClick={() => setShowModal(true) }>작성 완료</CommonButton>
          </div>
        )}
        {/* 게시글만 수정 시 - '작성 완료'로 바로 내용 저장
            썸네일 수정 시 - '썸네일 변경' 버튼으로 수정 후 내용 저장 */}
        {postSeq > 0 && (
          <div style={{display: 'flex', marginTop: '30px'}}>
            <CommonButton style={{marginTop: '30px'}} onClick={() => setShowModal(true) }>썸네일 변경</CommonButton>
            <CommonButton style={{marginRight: '0px', marginTop: '30px'}} onClick={() => handlePostComplete()}>작성 완료</CommonButton>
          </div>
        )}
      </div>
      <ThumbnailModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        {...modalData}
      />
    </>
  );
};

export default PostEditor;
