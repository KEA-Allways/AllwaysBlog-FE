import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// bootstrap css 적용
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThumbnailModal.css";
import html2canvas from "html2canvas";
import { left } from "@popperjs/core";

const ThumbnailModal = ({ showModal, onClose} ) => {
  //modal
//   const [showModal, setShowModal] = useState();
//   const handleModalClose = () => setShowModal(false);
//   const handleModalOpen = () => setShowModal(true);

  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const [title, setTitle] = useState("제목을 입력하세요");
  const [content, setContent] = useState("내용을 입력하세요");

  const [textColorStyle, setTextColorStyle] = useState(null);

  const [showSubtitle, setShowSubtitle] = useState(true);

  const previewRef = useRef(null);

  //fastApi에 요청 보내기 
    //cors 때문에 카카오에서막아둠 
    const handleKarloImage = async () => {
        let promptValue = prompt('프롬프트를 입력하세요 😇');
        if (promptValue === null) return;
      
        let negativePromptValue = prompt('부정적인 프롬프트를 입력하세요 😇');
        if (negativePromptValue === null) return;
      
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
        //       const data = await response.json();
        //   console.log(data);
        // } catch (error) {
        //   console.error('Error:', error);
        // }
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
  const handleImageBackground = () => {
    const regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    let imgUrl = prompt("이미지 주소를 입력하세요 😇");
    if (imgUrl === null) return;

    if (!imgUrl.match(regex)) {
      alert("올바르지 않은 URL입니다 😨");
      return;
    }

    setBackgroundImage(imgUrl);
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

  //리셋하기
  const handleReset = () => {
    setBackgroundImage("");
    setBackgroundColor("");
    setTitle("제목을 입력하세요");
    setContent("내용을 입력하세요");
    setShowSubtitle(true)
  };
  //사진 윈도우에 저장하기
  const handleExport = () => {
    if (previewRef.current) {
      console.log(previewRef);
      
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
    }
  };

  return (
    <div className="container demo">
      {/* <div className="text-center">
        <Button variant="primary" onClick={handleModalOpen}>
          Modal
        </Button>
      </div> */}

      <Modal
        show={showModal}
        onHide={onClose}
        className="modal fade"
        size="lg"
            
      >
        <section className="wrapper">
          <Container fluid className="wrapper">
            <Row className="contents">
               
                <header>
                  <h1>Thumbnail Maker</h1>
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
                    paddingLeft:"5px"
                     
                    
                  }}
                >
                  <ul className="components" id="comp__opt1">
                    <li
                      className="render title"
                      style={{ color: textColorStyle }}
                    >
                      {title}
                    </li>
                    {showSubtitle && (<li
                      className="render subtitle"
                      style={{ color: textColorStyle }}
                    >
                      {content}
                    </li>)}
                  </ul>
                </div>
                
                <div className="control__panel">
                  <div className="inputFields horizontal">
                    
                    <Form.Group controlId="title">
                      <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitleChange}
                        style={{ width: '200px', height: '40px', marginRight: '10px' }}
                      />
                    </Form.Group>
                    <Form.Group controlId="subtitle">
                      <Form.Control
                        type="text"
                        placeholder="내용을 입력하세요"
                        onChange={handleSubtitleChange}
                        style={{ width: '200px', height: '40px' }}
                      />
                    </Form.Group>
                  </div>
                  <div className="background__btns">
                    <div id="background__btn__container" className="btns">
                      <Button
                        variant="primary"
                        className="btn random__solid"
                        onClick={handleRandomColorClick}
                      >
                        랜덤 단색
                      </Button>
                      <Button
                        variant="primary"
                        className="btn img__url"
                        onClick={handleImageBackground}
                      >
                        이미지 URL
                      </Button>

                      <Button variant="primary" className="btn karlo_api" onClick={handleKarloImage} >
                        칼로 API
                    </Button>
                    </div>
                  </div>
                  <div className="components__btns">
                    <div id="component__btn__container" className="btns">
                      <Button
                        data-set="comp__opt1"
                        className="btn component__opt"
                        onClick={() => setShowSubtitle(true)}
                      >
                        제목 / 내용
                      </Button>
                      <Button
                        data-set="comp__opt2"
                        className="btn component__opt"
                        onClick={() => setShowSubtitle(false)}
                      >
                        제목만
                      </Button>
                    </div>
                  </div>

                  <div className="text__style">
                    <div id="textstyle__btn__container" className="btns">
                      <Button
                        className="btn text__btn text__invert"
                        onClick={() => handleTextBlackOrWhite()}
                      >
                        텍스트 색상 반전
                      </Button>
                      <Button
                        className="btn text__btn text__random"
                        onClick={() => handleTextColorChange()}
                      >
                        텍스트 색상 랜덤
                      </Button>
                    </div>
                  </div>
                  <div className="master__panel">
                    <Button
                      variant="primary"
                      id="initialize"
                      onClick={handleReset}
                    >
                      초기화
                    </Button>
                    <Button
                      variant="primary"
                      id="export"
                      onClick={handleExport}
                    >
                      완료 및 이미지화
                    </Button>
                  </div>
                </div>
              
            </Row>
          </Container>
        </section>
        <section className="mod capture_modal hidden"></section>
        <div className="mod overlay hidden"></div>
      </Modal>
    </div>
  );
};

export default ThumbnailModal;
