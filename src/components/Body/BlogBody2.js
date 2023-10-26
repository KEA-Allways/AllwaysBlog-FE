import {Col, Container, Row} from 'react-bootstrap';
import { useState } from "react";
import { CommonButton } from "../../common";
import styles from "./BlogBody.module.css";
import CardStyle from "../PostCard/CardStyle";
import ListStyle from "../PostCard/ListStyle";
import { useNavigate } from 'react-router-dom';
import Paging from '../../components/Paging/Paging';

const CardsData = [

  {
    src : "/img/chicken.jpg",
    alt : "chicken",
    title : "양념 치킨",
    subtitle : "치킨 먹방",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/kebab.jpg",
    alt : "kebab",
    title : "케밥",
    subtitle : "이태원 케밥",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/hamburger.jpg",
    alt : "hamburger",
    title : "햄버거",
    subtitle : "햄버거",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/pizza.jpg",
    alt : "pizza",
    title : " 도미노 피자",
    subtitle : "도미노 피자 ",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/tomato_pasta.jpg",
    alt : "tomato_pasta",
    title : "토마토 파스타",
    subtitle : "토마토 파스타",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/udon.jpg",
    alt : "udon",
    title : "udon",
    subtitle : "일본식 우동",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  } 
]

const BlogBody = () => {

  const navigate = useNavigate();

  const editButtonClicked = (postSeq) => {
    navigate('/post', { state: { postSeq: postSeq } });
  };
  

  const [showContent, setShowContent] = useState("카드형");
  const handleButtonClick = (content) => {
    setShowContent(content)
  };

  return (
      <Container>
        <Row className="my-5">
          <Col md={1}>

          </Col>
          <Col md={10}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {showContent === "카드형" && (
                <div>
                <img className={styles.buttonStyle} src="/img/selected-card-style.png" alt="cardStyle" onClick={() => handleButtonClick("카드형")}/>
                <img className={styles.buttonStyle} src="/img/unselected-list-style.png" alt="listStyle" onClick={() => handleButtonClick("리스트형")}/>
                </div>
              )}
              {showContent === "리스트형" && (
                <div>
                <img className={styles.buttonStyle} src="/img/unselected-card-style.png" alt="cardStyle" onClick={() => handleButtonClick("카드형")}/>
                <img className={styles.buttonStyle} src="/img/selected-list-style.png" alt="listStyle" onClick={() => handleButtonClick("리스트형")}/>
                </div>
              )}
            </div>
            <CommonButton variant="outlined" sx={{marginRight:"10px"}} onClick={() => editButtonClicked(0)}>글 작성하기</CommonButton>
          </div>
          <br></br>

          {showContent === "카드형" && (
            <Row xs={1} md={3} className="g-6">
            {CardsData.map((blg, index) => (
              <Col key={index}>
                <CardStyle
                  imgUrl={blg.src}
                  imgHeight="180px"
                  imgWidth="200px"
                  title={blg.title}
                  subtitle={blg.subtitle}
                  usericon={blg.userIcon}
                  nickname={blg.nickname}
                />
              </Col>
            ))}
          </Row>
          )}
          
          {showContent === "리스트형" && (
            <Row lg="1" xl="1">
            {CardsData.map((blg, index) => (
              <Col key={index}>
                <ListStyle
                  title={blg.title}
                  subtitle={blg.subtitle}
                  usericon={blg.userIcon}
                  nickname={blg.nickname}
                />
              </Col>
            ))}
          </Row>
          )}
          </Col>
          <Col md={1}>
          
          </Col>
        </Row>
        
        {/* paging 추가 */}
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Paging />
        </div>
      </Container>
  );
};

export default BlogBody;