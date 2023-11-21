import { useState, useRef,useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// bootstrap css 적용
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThemeModal.css";
import html2canvas from "html2canvas";
import {CommonButton }from "../../common";
import { CommonColorButton } from "../../common";
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
// App.js 또는 원하는 컴포넌트 파일에서
import '../../index.css';



const ModalButton = styled(CommonButton)`
   
  width: 226px;
  height: 70px;
  font-size: 16px;
  cursor: pointer;
  margin-right:0px;

  &:hover{
    color: white;
      background: white;
       
      border: 0px solid white;
    }
   
`
const SuccessButton = styled(CommonColorButton)`

    font-size:14px;

    width:120px;

    &:hover{
      transform: scale(1.02);
        background: rgba(0,170,234);
        transition: 0.5s;
    }
`




const ThemeModal = ({ showModal, onClose} ) => {
  //modal
   
  const navigate = useNavigate();
  
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [s3ImageUrl, setS3ImageUrl] = useState('');
  const [themeName, setThemeName] = useState('');

  const previewRef = useRef(null);
  const bootstrapModalRef = useRef(null);


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
        console.log(promptValue.value);
        console.log(negativeValue.value);
        
        const positive=",high quality,Canon EF 24mm F2.8 IS USM"
        const negative = ",low quality, worst quality,mutated,mutation,distorted,deformed,white frame"
        // FASTAPI 와 통신
        const response = await fetch('http://localhost:8000/generate_image/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'positivePrompt': promptValue.value+positive,
            'negativePrompt': negativeValue.value +negative,
            'samples': 1,
            'image_quality':100,
            'width':640,
            'height':320
          })
        });
        //fastAPi에서 받은 image url 적용 
        if (response.ok) {
          const data = await response.json(); // Convert response to JSON
          //받아온 s3_image_url 값이 있으면
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
 

  //fastApi에 요청 보내기 
    //cors 때문에 카카오에서막아둠 
 
      
   
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
  
  //테마 제작 
  const handleExport =  () => {
    if (previewRef.current) {
      
      //백엔드로 전송 
      fetch('http://localhost:8761/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: s3ImageUrl,
          themeName: themeName,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the backend as needed
          console.log(data);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });
       
      //image_url spring boot 로 보내기 
      Swal.fire ({
        title:"테마 제작",
        timer:3000,
        didOpen:()=>{
          Swal.showLoading()
        }
      }).then(navigate("/"))
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
      
        <section className="wrapper" style={{height:"620px"}}>
          <Container fluid className="wrapper">
            <Row className="contents">
               
            <header style={{  display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: 'Yeongdeok Snow Crab', color: "black", textAlign: "center", marginLeft: "380px",marginTop:"5px" }}>
                테마 이미지 생성기
              </h3>
              
              <div style={{ textAlign: "right" }}>
               
                <SuccessButton
                  className="modal__sucess__btn me-3"
                  id="export"
                   
                  onClick={handleExport}
                >
                  완료 및 이미지화
                </SuccessButton>
              </div>
              
            </header>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Control size="sm" type="text" placeholder="테마를 적어주세요" 
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            style={{width:"250px", height:"20px" , 
            fontSize:"18px",fontWeight:"bold",textAlign:"center" }}/>

            </div>
                
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
                      style={{ height: "40px",
                          width:"40px"
                       }}
                      onClick={handleReset}
                      sx={{color:"white"}}
                    >
                      초기화
                    </AutorenewOutlinedIcon>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" ,
                marginTop:"15px"}}>
                   
                    <ButtonGroup sx={{marginLeft:"5px"}} >
                    <ModalButton
                      className="btn random__solid "
                      onClick={handleRandomColorClick}
                      style={{backgroundColor:"#6699CC"}}
                       
                    >
                      랜덤 단색
                    </ModalButton>
                    <ModalButton
                      className="btn img__url  "
                      onClick={handleImageModal}
                      style={{backgroundColor:"#7EB77F"}}
                       
                    >
                      이미지 URL
                    </ModalButton>
                    <ModalButton
                      className="btn karlo_api"
                      onClick={handleKarloImage}
                      style={{backgroundColor:"#FF8C42"}}
                       
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
