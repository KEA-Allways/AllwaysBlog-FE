import { useState, useRef,useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// bootstrap css 적용
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThumbnailModal.css";
import html2canvas from "html2canvas";
import {CommonButton, CommonColorButton, CommonDeleteButton }from "../../common";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
// App.js 또는 원하는 컴포넌트 파일에서
import '../../index.css';
import { ChromePicker } from 'react-color';
import { Preview } from "@mui/icons-material";



const ModalButton = styled(CommonButton)`
  background-color: #f4f4f4;
  
  color: #666666;
  width: 192px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: white;
    background-color:black;
    border: 0px solid black;
  }
`

const ResetButton = styled(CommonDeleteButton)`
  width: 170px;
  height: 48px;
  margin-right: 0px;
  
  &:hover {
    transform: scale(1.05);
    background: rgba(216, 63, 63);
    transition: 0.5s;
  }
`

const SuccessButton = styled(CommonColorButton)`
  color: white;
  width: 170px;
  height: 48px;
  background: rgba(0,190,254);
  margin-right: 0px;
  
  &:hover {
    transform: scale(1.05);
    background: rgba(0,190,254);
    transition: 0.5s;
  }
    
`

//props Content , Title 받기 
const ThumbnailModal = (props) => {
  const { showModal, onClose, postContent, postTitle} = props;

  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const [title, setTitle] = useState("제목을 입력하세요");
  const [content, setContent] = useState("내용을 입력하세요");

  const [textColorStyle, setTextColorStyle] = useState(null);

  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showTitle,setShowTitle] =useState(true);

  const previewRef = useRef(null);
  const bootstrapModalRef = useRef(null);

  const [s3ImageUrl, setS3ImageUrl] = useState('');

 

  //fastApi에 요청 보내기 
    //cors 때문에 카카오에서막아둠 
    const handleKarloImage =async ()=>{
      try{
        const promptValue = await Swal.fire({
          title: '키워드를 입력해주세요',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          showLoaderOnConfirm: true,
          preConfirm: (promptValue) => {
            if (!promptValue) {
              Swal.showValidationMessage('키워드');
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }) 
        // 긍정 키워드 완료되면 
        if(promptValue.isConfirmed){
          const negativeValue =await Swal.fire({
            title: '화면에 표시를 원하지 않은 키워드를 입력해주세요 ',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            preConfirm: (negativeValue) => {
              if (!negativeValue) {
                Swal.showValidationMessage('부정적인 키워드');
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }) ;
          if(negativeValue.isConfirmed){
             
            
            const positive=",high quality,Canon EF 24mm F2.8 IS USM"
            const negative = ",low quality, worst quality,mutated,mutation,distorted,deformed,white frame"

            const response = await fetch('http://localhost:8000/generate_image/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({
                'positivePrompt': promptValue.value+positive,
                'negativePrompt': negativeValue.value+negative,
                'samples': 1,
                'image_quality':100,
                'width':640,
                'height':320
              })
            });
    
            if (response.ok) {
              const data = await response.json(); // Convert response to JSON
              if (data.s3_image_url) {
                console.log('Image URL:', data.s3_image_url);
                setS3ImageUrl(data.s3_image_url);
                setBackgroundImage(data.s3_image_url);
              } else {
                console.error('Error:', data.message);
              }
            } else {
              throw new Error('Network response was not ok');
            }
          }
          
        }
    
    
      }catch(error){
        console.error('Error',error);
        
      }
    }
     
   
  //url 통해서 프리뷰 변경하기
  const handleImageModal =   async() => {
    
    //input url 로 자동 체크 
    const {value:imgUrl}= await Swal.fire({
      title: '이미지 URL 입력',
      input: 'url',
      inputPlaceholder: '이미지 주소를 입력하세요',
      showCancelButton: true,
      confirmButtonText: '확인',
    }) 
    
    //imgUrl 유효하면 배경 설정 
    if (imgUrl) {      
      setBackgroundImage(imgUrl);
    }
  };

   
  //inputFields 받은 값을 통해서 components 값 수정하기
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  //제목 or 제목 내용 
  const handleSubtitleChange = (e) => {
    setContent(e.target.value);
  };

  // RGB 값 랜덤으로 주기
  const randomRGB = () => {
    let rgb = "";
    rgb += (Math.floor(Math.random() * 90 + 1) + 150)
      .toString(16)
      .padStart(2, "0");
    rgb += (Math.floor(Math.random() * 90 + 1) + 150)
      .toString(16)
      .padStart(2, "0");
    rgb += (Math.floor(Math.random() * 90 + 1) + 150)
      .toString(16)
      .padStart(2, "0");
    return "#" + rgb;
  };

  //클릭하면 랜덤RGB로 변경
  const handleRandomColorClick = () => {
    const randomBackgroundColor = randomRGB();
    setBackgroundColor(randomBackgroundColor);
  };

  const handleTextColorChange = () => {
    let randomTextColor = randomRGB();
    setTextColorStyle(randomTextColor);
  };

  const handleTextBlackOrWhite = () => {
    setTextColorStyle((randomTextColor) =>
      randomTextColor === "black" ? "white" : "black"
    );
  };
  const handleTitle=()=>{
    setShowTitle(true)
    setShowSubtitle(true)
  }
  const handleSubTitle=()=> {
    setShowTitle(true)
    setShowSubtitle(false)
  }
  const handleTitleSubTitle = ( ) => {
    setShowSubtitle(false)
    setShowTitle(false)
  }

  //리셋하기
  const handleReset = () => {
    setBackgroundImage("");
    setBackgroundColor("");
    setTitle("제목을 입력하세요");
    setContent("내용을 입력하세요");
    setTextColorStyle("white")
    setShowSubtitle(true)
  };

  //저장버튼 클릭 시
  const handleExport = async () => {
    try{
      if(Preview.current){
      //게시글 저장
      //로그인에서 jwt를 header 에 넣기 
        const response = await fetch('http://localhost:8082/api/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'AccessToken': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMDkyNjgyLCJleHAiOjE3MDE2OTc0ODJ9.SP6HurxWPXR5G7H33rOtNgYc3TWdYLVeXzzb_AOL2Bo`, // accessKey를 사용한 토큰 전송
          },
            body: JSON.stringify({
              postTitle: postTitle,
              postContent: postContent,
              imageUrl: s3ImageUrl,
              categorySeq : 1
            }),
          });
        if (response.ok){
          const data = await response.json();
          let resultSeq = 0;
          console.log(data);
          console.log(data.result.data.postSeq > 0)
          if (data.result.data.postSeq > 0){
            resultSeq = data.result.data.postSeq;
            console.log(resultSeq);

            Swal.fire({
              title: "게시글을 저장 중입니다.",
              timer: 3000,
              didOpen: () => {
                Swal.showLoading()
              }
            }).then(() => {
              console.log(`/post/${resultSeq}`)
              navigate(`/post/${resultSeq}`);
            });
            
          } else {
            console.error('Error:', data.message);
            //문구 이상하면 변경 해주세용~
            alert("게시글을 저장하는데 오류가 발생했습니다.");
          }

        }     
      }
    } catch (error){
      console.error('Error:', error);
    }
  };

  return (
     
       //enforceFocus 로 모달 위에 모달 TEXT 입력 가능 
      <Modal
        show={showModal}
        onHide={onClose}
        style={{top: "50px" }}
        size="sm"
        data-bs-focus="false"
        enforceFocus={false}
      >
      
        <section className="wrapper"  >
          <Container fluid className="wrapper">
            <Row className="contents">
               
                <header style={{background:"#f4f4f4", textAlign:"center"}}>
                  <h1 style={{fontFamily: 'YeongdeokBlueroad',color:"black"}}>썸네일 생성기</h1>
                </header>
                {/* preview 에 배경단색 설정과 배경 이미지 설정  ref를 통해서 dom에 접근할수 있다.*/}
                 
                <div
                   
                  id="capture"
                  className="preview"
                  ref={previewRef}
                  style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundColor: backgroundColor,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    float:"left",
                    paddingLeft:"5px",
                    width:"450px"
                  }}
                >
                  <ul className="components" id="comp__opt1">
                    {showTitle && (<li
                      className="render title"
                      style={{ color: textColorStyle, fontSize:"40px",fontFamily: 'YeongdeokBlueroad' } }
                    >
                      {title}
                    </li>)}
                    {showSubtitle && (<li
                      className="render subtitle"
                      style={{ color: textColorStyle ,fontFamily: 'YeongdeokBlueroad'}}
                    >
                      {content}
                    </li>)}
                  </ul>
                </div>
                
                <div className="control__panel">
                  <div className="inputFields horizontal">
                    
                    <Form.Group   className="me-3">
                      <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitleChange}
                        style={{ width: '200px', height: '40px', marginRight: '10px' }}
                      />
                    </Form.Group>
                    <Form.Group  className="me-5" >
                      <Form.Control
                        type="text"
                        placeholder="내용을 입력하세요"
                        onChange={handleSubtitleChange}
                        style={{ width: '200px', height: '40px' }}
                      />
                    </Form.Group>
                  </div>
                  <div className="background__btns ">
                    <div id="background__btn__container" className="modal__btns">
                      <ModalButton
                        className="random__solid  me-3"
                        onClick={handleRandomColorClick}
                        style={{width: '160px', height: '40px'}}
                        
                      >
                        랜덤 단색
                      </ModalButton>
                      <ModalButton
                        className="img__url  me-3"
                        onClick={handleImageModal}
                        style={{width: '160px', height: '40px'}}
                      >
                        이미지 URL
                      </ModalButton>

                      <ModalButton  
                        className="karlo_api" onClick={handleKarloImage} 
                        style={{width: '160px', height: '40px'}}>
                        칼로 API
                    </ModalButton>
                    </div>
                  </div>
                  <div className="components__btns">
                    <div id="component__btn__container" className="modal__btns">
                      <ModalButton
                         className="me-3"
                        onClick={() => handleTitle()}
                        style={{width: '160px', height: '40px'}}
                      >
                        제목 / 내용
                      </ModalButton>
                      <ModalButton
                        className="me-3"
                        onClick={() => handleSubTitle()}
                        style={{width: '160px', height: '40px'}}
                      >
                        제목만
                      </ModalButton>
                      <ModalButton
                        className="me-3"
                        onClick={() => handleTitleSubTitle()}
                        style={{width: '160px', height: '40px'}}
                      >
                        없음
                      </ModalButton>
                    </div>
                  </div>

                  <div className="text__style">
                    <div id="textstyle__btn__container" className="modal__btns">
                      <ModalButton
                        className="me-3"
                        onClick={() => handleTextBlackOrWhite()}
                      >
                        텍스트 색상 반전
                      </ModalButton>
                      <ModalButton
                        className="me-5"
                        onClick={() => handleTextColorChange()}
                      >
                        텍스트 색상 랜덤
                      </ModalButton>
                    </div>
                  </div>
                  <div className="master__panel modal__btns me-5">
                    <ResetButton
                      className="modal__init__btn me-3"
                      id="initialize"
                      style={{ width:"192px" ,height: "60px",
                       }}
                      onClick={handleReset}
                    >
                      초기화
                    </ResetButton>
                     
                    <SuccessButton
                      className="modal__sucess__btn  "
                      id="export"
                      style={{ height: "60px",width:"192px"}}
                      onClick={handleExport}
                       
                    >
                      완료 및 이미지화
 
                    </SuccessButton>
                  </div>
                </div>
              
            </Row>
          </Container>
        </section>
        <section className="mod capture_modal hidden"></section>
        <div className="mod overlay hidden"></div>
      </Modal>
     
  );
};

export default ThumbnailModal;
