import { Link } from "react-router-dom";
import {Card, Col, Row} from 'react-bootstrap';
import { useState } from "react";
import styles from "./BlogBody.module.css";
import {motion} from "framer-motion";

const CardsData = [
  {
    src : "/img/mpc1.png",
    alt : "에이치티엠엘",
    title : "카드 1번입니다.",
    subtitle : "카드 1번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준1"
  },
  {
    src : "/img/mpc2.png",
    alt : "씨에스에스",
    title : "카드 2번입니다.",
    subtitle : "카드 2번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준2"
  },
  {
    src : "/img/mpc3.jpeg",
    alt : "자바스크립트",
    title : "카드 3번입니다.",
    subtitle : "카드 3번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준3"
  },
  {
    src : "/img/mpc4.png",
    alt : "리액트",
    title : "카드 4번입니다.",
    subtitle : "카드 4번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준4"
  },
  {
    src : "/img/mpc5.svg",
    alt : "노드제이에스",
    title : "카드 5번입니다.",
    subtitle : "카드 5번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준5"
  },
  {
    src : "/img/mpc6.png",
    alt : "스프링부트",
    title : "카드 6번입니다.",
    subtitle : "카드 6번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준6"
  },
  {
    src : "/img/mpc7.svg",
    alt : "마이에스큐엘",
    title : "카드 7번입니다.",
    subtitle : "카드 7번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준7"
  },
  {
    src : "/img/mpc8.png",
    alt : "마리아디비",
    title : "카드 8번입니다.",
    subtitle : "카드 8번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준8"
  },
  {
    src : "/img/mpc9.png",
    alt : "몽고디비",
    title : "카드 9번입니다.",
    subtitle : "카드 9번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준9"
  },
  {
    src : "/img/mpc10.png",
    alt : "레디스",
    title : "카드 10번입니다.",
    subtitle : "카드 10번에 대한 설명입니다.",
    userIcon : "/img/usericon.png",
    nickname : "김성준10"
  },
];

const BlogBody = () => {

  const [showContent, setShowContent] = useState("카드형");
  const handleButtonClick = (content) => {
    setShowContent(content)
  };

  const Card1 = ({imgUrl, alt, imgHeight, title, subtitle, usericon, nickname}) => {
    return (
      <div  className={styles.cardStyle}>
      <Card>
        <Card.Img variant="top" alt={alt} src={imgUrl} height={imgHeight} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <img src={usericon} alt="사용자아이콘" width="20px" height="20px" /> <small>by {nickname}</small>
        </Card.Footer>
      </Card>
      </div>
    );
  };
  
  const Card2 = ({title, subtitle, usericon, nickname}) => {
    return (
      <div className={styles.listStyle}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <img src={usericon} alt="사용자아이콘" width="20px" height="20px" /> <small>by {nickname}</small>
        </Card.Footer>
      </Card>
      </div>
    );
  };

  return (
    <div className={styles.mt5}>
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
        <Link to="/post">
          <button>글 작성하기</button>
        </Link>
      </div>
      <br></br>

      {showContent === "카드형" && (
        <Row xs={1} md={5} className="g-4">
        {CardsData.map((blg, index) => (
          <Col key={index}>
            <Card1
              imgUrl={blg.src}
              imgHeight="150px"
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
            <Card2
              title={blg.title}
              subtitle={blg.subtitle}
              usericon={blg.userIcon}
              nickname={blg.nickname}
            />
          </Col>
        ))}
      </Row>
      )}
      
    </div>
  );
};

export default BlogBody;