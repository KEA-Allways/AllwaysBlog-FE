import { useState, useRef,useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// bootstrap css 적용
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThemeModal.css";
import html2canvas from "html2canvas";
import {CommonButton }from "../../common";
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
// App.js 또는 원하는 컴포넌트 파일에서
import '../../index.css';



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
    color: #fff;
    }
`

const ResetButton = styled(ModalButton)`
&:hover {
      background-color: red;
      color:white
    }
`

const SuccessButton = styled(ModalButton)`

    &:hover{
      background-color: green;
      color:white
    }
`




const ThemeModal = ({ showModal, onClose} ) => {
  //modal
   
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const previewRef = useRef(null);
  const bootstrapModalRef = useRef(null);

 

  //fastApi에 요청 보내기 
    //cors 때문에 카카오에서막아둠 
    const handleKarloImage = async () => {

        let promptValue;
        let  negativePromptValue;

        Swal.fire({
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
        }).then((result) => {
          if (result.isConfirmed) {
            const promptValue = result.value;
            if (promptValue === null) return;
    
            // 다음 프롬프트 대신 부정적인 프롬프트를 표시합니다.
            Swal.fire({
              title: '화면에 표시를 원하지 않은 키워드를 입력해주세요 ',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: '확인',
              cancelButtonText: '취소',
              showLoaderOnConfirm: true,
              preConfirm: (negativePromptValue) => {
                if (!negativePromptValue) {
                  Swal.showValidationMessage('부정적인 키워드');
                }
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((negativeResult) => {
              if (negativeResult.isConfirmed) {
                const negativePromptValue = negativeResult.value;
                if (negativePromptValue === null) return;
    
                 
              }
            });
          }
        });
      
        try {
          const response = await fetch('http://localhost:8000/generate_image/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              'prompt': promptValue,
              'negative_prompt': negativePromptValue
            })
          });
        
        //cors 문제 예상 
          const data = await response.json();
          if (data.image_url) {
            // Use the image URL in your React application
            console.log('Image URL:', data.image_url);
            //이미지 저장 
            setBackgroundImage(data.image_url)
          } else {
            console.error('Error:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
   
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

 
  //리셋하기
  const handleReset = () => {
    setBackgroundImage("");
    setBackgroundColor("");
    
  };
  //사진 윈도우에 저장하기
  const handleExport =  () => {
    

    if (previewRef.current) {


        html2canvas(previewRef.current, {
        allowTaint: true,
        useCORS: true,
         
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "thumbnail.png";
        link.href = imgData;
        link.click();
      });


      Swal.fire ({
        title:"게시글 제작",
        timer:3000,
        didOpen:()=>{
          Swal.showLoading()
        }
      }).then(navigate("/blogs"))
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
               
            <header style={{  display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: 'YeongdeokBlueroad', color: "black", textAlign: "center", marginLeft: "350px" }}>테마 이미지 생성기</h2>
              <div style={{ textAlign: "right" }}>
                <SuccessButton
                  className="modal__sucess__btn me-3"
                  id="export"
                  style={{width:"150px"  }}
                  onClick={handleExport}
                >
                  완료 및 이미지화
                </SuccessButton>
              </div>
            </header>
                
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
                    width:"670px",
                    marginTop:"20px",
                    borderRadius:"15px"
                  }}
                >
                    <AutorenewOutlinedIcon
                      className="modal__init__btn"
                      id="initialize"
                      style={{ height: "60px",
                          width:"60px"
                       }}
                      onClick={handleReset}
                      sx={{color:"white"}}
                    >
                      초기화
                    </AutorenewOutlinedIcon>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" ,marginTop:"15px"}}>
                   
                    <ButtonGroup >
                    <ModalButton
                      className="btn random__solid  "
                      onClick={handleRandomColorClick}
                      style={{ width: '220px', height: '65px' }}
                    >
                      랜덤 단색
                    </ModalButton>
                    <ModalButton
                      className="btn img__url  "
                      onClick={handleImageModal}
                      style={{ width: '220px', height: '65px', marginLeft:"5px" }}
                    >
                      이미지 URL
                    </ModalButton>
                    <ModalButton
                      className="btn karlo_api"
                      onClick={handleKarloImage}
                      style={{ width: '220px', height: '65px' ,marginLeft:"5px"}}
                    >
                      칼로 API
                    </ModalButton>
                    </ButtonGroup>
                    
                    
                   
                  
                </div>
             
                 
              
            </Row>
          </Container>
        </section>
        <section className="mod capture_modal hidden"></section>
        <div className="mod overlay hidden"></div>
      </Modal>
     
  );
};

export default ThemeModal;
