import { Link } from "react-router-dom";
import {Col, Row} from 'react-bootstrap';
import { useState } from "react";
import { CommonButton } from "../../common";
import axios from "axios";
import styles from "./BlogBody.module.css";
import CardStyle from "../PostCard/CardStyle";
import ListStyle from "../PostCard/ListStyle";
import styled from "@emotion/styled";

const PostButton = styled(CommonButton)`
  background-color:white;
  color:black;
  width: 122px;
  height: 40px;
  border-color:black;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #fff;
    }
`

const CardsData = [

  {
    src : "/img/Gyeongbokgung.jpg",
    alt : "Gyeongbokgung",
    title : "경복궁",
    subtitle : "경복궁 나들이",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/busan.jpg",
    alt : "busan",
    title : "부산",
    subtitle : "부산 국밥투어",
    userIcon : "/img/usericon.png",
    nickname : "김민준"
  },
  {
    src : "/img/Egypt.jpg",
    alt : "Egypt",
    title : "이집트",
    subtitle : "이집트 피라미드 낙타 체험",
    userIcon : "/img/usericon.png",
    nickname : "최다정"
  },
  {
    src : "/img/Eiffel_Tower.jpg",
    alt : "Eiffel_Tower",
    title : " 에펠탑",
    subtitle : "에펠탑 좋은 자리 찾는법",
    userIcon : "/img/usericon.png",
    nickname : "류창민"
  },
  {
    src : "/img/Hong_Kong.jpg",
    alt : "Hong_Kong",
    title : "홍콩 거리",
    subtitle : "영화속 홍콩 거리 찾기 ",
    userIcon : "/img/usericon.png",
    nickname : "황수하"
  },
  {
    src : "/img/Sydney.jpg",
    alt : "Sydney",
    title : "시드니 오페라하우스",
    subtitle : "오페라 하우스 주변 관광",
    userIcon : "/img/usericon.png",
    nickname : "김성준"
  },
  {
    src : "/img/thailand.jpg",
    alt : "thailand",
    title : "방콕",
    subtitle : "방콕 맛집을 찾아보자",
    userIcon : "/img/usericon.png",
    nickname : "김민준"
  },
  {
    src : "/img/Turkye.jpg",
    alt : "Turkye",
    title : "틔르키에",
    subtitle : "터키 아니죠~ 틔르키에 ",
    userIcon : "/img/usericon.png",
    nickname : "최다정"
  },
  {
    src : "/img/Tokyo.jpg",
    alt : "Tokyo",
    title : "도쿄",
    subtitle : "교토 아니죠~ 도쿄 ",
    userIcon : "/img/usericon.png",
    nickname : "류창민"
  },
  {
    src : "/img/Hawaii.jpg",
    alt : "Hawaii",
    title : "하와이",
    subtitle : "니가가라 하와이 ",
    userIcon : "/img/usericon.png",
    nickname : "황수하"
  },
]

const BlogBody = () => {

  const [showContent, setShowContent] = useState("카드형");
  const handleButtonClick = (content) => {
    setShowContent(content)
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
        {/* <Link to={`/post?initialContent=${encodeURIComponent("게시글 수정엔<br><br><br>엔터를 누른다는 내용<br><br>dㅇ")}`}>
          <PostButton>글 작성하기</PostButton>
        </Link> */}
        <Link to={`/post?initialContent`}>
          <PostButton>글 작성하기</PostButton>
        </Link>
      </div>
      <br></br>

      {showContent === "카드형" && (
        <Row xs={1} md={3} className="g-6">
        {CardsData.map((blg, index) => (
          <Col key={index}>
            <CardStyle
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
      
    </div>
  );
};

export default BlogBody;