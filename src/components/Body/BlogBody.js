import {Col, Container, Row} from 'react-bootstrap';
import { useState } from "react";
import { CommonButton } from "../../common";
import styles from "./BlogBody.module.css";
import CardStyle from "../PostCard/CardStyle";
import ListStyle from "../PostCard/ListStyle";
import { useNavigate, Link } from 'react-router-dom';
import Paging from '../../components/Paging/Paging';
import ViewList from '@mui/icons-material/ViewList';
import ViewModule from '@mui/icons-material/ViewModule';

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

const itemsPerPage = 3;

const BlogBody = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState('gridList');
  const [currentPage, setCurrentPage] = useState(1);

  // 여기 페이지에서는 항상 새로운 게시글 등록이기에 postSeq로 0을 보낸다
  const editButtonClicked = (postSeq) => {
    const theme = '현재 페이지 테마';
    navigate('/post', { state: { postSeq: postSeq, templateSeq: undefined, theme } });
  };

  const handleButtonClick = (content) => {
        setShowContent(content);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = CardsData.slice(startIndex, endIndex);

  return (
    <Container>
        <Row className="my-5">
          <Col md={1}>

          </Col>
          <Col md={10}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {showContent === "gridList" && (
                <div>
                  <ViewModule fontSize="large" onClick={() => handleButtonClick("gridList")} />
                  <ViewList fontSize="large" color="disabled" onClick={() => handleButtonClick("lineList")} />
                </div>
              )}
              {showContent === "lineList" && (
                <div>
                  <ViewModule fontSize="large" color="disabled" onClick={() => handleButtonClick("gridList")} />
                  <ViewList fontSize="large" onClick={() => handleButtonClick("lineList")} />
                </div>
              )}
            </div>
            <CommonButton variant="outlined" sx={{marginRight:"10px"}} onClick={() => editButtonClicked(0)}>글 작성하기</CommonButton>
          </div>
          <br></br>

          {showContent === "gridList" && (
            <Row xs={1} md={3} className="g-6">
            {displayedData.map((blg, index) => (
              <Col key={index}>
                <Link to={`/post/${blg.title}?imgUrl=${blg.src}`}>
                <CardStyle
                  imgUrl={blg.src}
                  imgHeight="180px"
                  imgWidth="200px"
                  title={blg.title}
                  subtitle={blg.subtitle}
                  usericon={blg.userIcon}
                  nickname={blg.nickname}
                  opacityValue="80%"
                  date={blg.date}/>
                </Link>
              </Col>
            ))}
          </Row>
          )}
          
          {showContent === "lineList" && (
            <Row lg="1" xl="1">
            {displayedData.map((blg, index) => (
              <Col key={index}>
                <Link to={`/post/${blg.title}?imgUrl=${blg.src}`}>
                  <ListStyle
                    title={blg.title}
                    subtitle={blg.subtitle}
                    usericon={blg.userIcon}
                    nickname={blg.nickname}
                  />
                </Link>
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
          <Paging
          activePage={currentPage}
          totalItemsCount={CardsData.length}
          onPageChange={handlePageChange}
          itemsPerPage = {itemsPerPage}/>
        </div>
    </Container>
  );
};

export default BlogBody;