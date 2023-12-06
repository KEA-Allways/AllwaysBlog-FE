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
import { TokenAxios } from "../../lib/TokenAxios.js"

const REACT_APP_AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
const REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID = process.env.REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
const REACT_APP_AWS_S3_BUCKET_NAME = process.env.REACT_APP_AWS_S3_BUCKET_NAME;


const TemplateEditor = () => {
  const location = useLocation();

  // navigate할 떄 담아오는 변수들
  const postSeq = location.state.postSeq;
  // const templateSeq = location.state.templateSeq;
  const params = useParams();

  
  
  const userSeq = localStorage.getItem("userSeq");
  
  const navigate = useNavigate();

  // 게시글 제목
  const [templateTitle, setTemplateTitle] = useState("");

  // 게시글 내용
  const [templateContent, setTemplateContent] = useState("");

  const [templateSeq, setTemplateSeq] = useState(0);
  // params.templateSeq ? setTemplateSeq(params.templateSeq) : setTemplateSeq(0)


  const getTemplate = async() => {
    try{
      const res = await TokenAxios.get(`/api/template/${params.templateSeq}`);
      setTemplateTitle(res.data.result.data.templateTitle);
      setTemplateContent(res.data.result.data.templateContent);
    }catch(e){
      console.log("생성페이지입니다.");
    }
  }
  
  useEffect(() => {
    getTemplate();
  }, [])

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

  // 게시글 저장(수정 시 썸네일 모달 없이 바로 저장) 함수
  const handleTemplateAdd = async () => {
    try{
      const res = await TokenAxios.post(`/api/template`, {
        templateTitle: templateTitle,
        templateContent: templateContent,
      })
      const data = res.data;
      console.log(data);

      if (data.success){
        
        Swal.fire({
          title: "템플릿을 저장 중입니다.",
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()
          }
        }).then(() => {
          navigate(`/mngt/template`);
        });

      } else {
        alert("템플릿을 저장하는데 실패했습니다.");
      }
    } catch(e) {
      console.error("An error occurred:", e);
      alert("템플릿을 저장하는데 오류가 발생했습니다.");
    }
    
  }

  const handleTemplateEdit = async () => {
    try{
      const res = await TokenAxios.put(`/api/template/${params.templateSeq}`, {
        templateTitle: templateTitle,
        templateContent: templateContent,
      })
      const data = res.data;
      console.log(data);

      if (data.success){
        
        Swal.fire({
          title: "템플릿을 수정 중입니다.",
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()
          }
        }).then(() => {
          navigate(`/mngt/template`);
        });

      } else {
        alert("템플릿을 수정하는데 실패했습니다.");
      }
    } catch(e) {
      console.error("An error occurred:", e);
      alert("템플릿을 수정하는데 오류가 발생했습니다.");
    }
    
  }
 
  return (
    <>
        <h2 style={{marginTop : "20px"}}>템플릿</h2>
      <div style={{ marginTop: '15px', marginBottom: '30px' }}>
        <TextField
          id="post-title"
          label="서식 제목"
          variant="outlined"
          value={templateTitle}
          onChange={(event) => setTemplateTitle(event.target.value)}
          style={{ width: '100%' }}>
        </TextField>
      </div>

        <ReactQuill
          ref={quillRef}
          value={templateContent}
          onChange={setTemplateContent}
          style={{ width: "100%", height: "600px" }}
          modules={modules}
          placeholder="서식을 작성해주세요"
        />
 

        <div>
          {params.templateSeq 
          ?
            <CommonButton style={{ marginRight: '0px', marginTop: '60px', marginLeft: 'auto' }} onClick={handleTemplateEdit}>
              수정 완료
            </CommonButton>
          :
            <CommonButton style={{ marginRight: '0px', marginTop: '60px', marginLeft: 'auto' }} onClick={handleTemplateAdd}>
              작성 완료
            </CommonButton>
           }
        
        </div>
        
    </>
  );
};

export default TemplateEditor;
