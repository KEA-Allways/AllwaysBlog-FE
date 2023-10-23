import {Col, Row} from 'react-bootstrap';
import CardStyle from '../PostCard/CardStyle';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'; 

const Grid = () => {

  const cardArr = [

    {
      src : "/img/Gyeongbokgung.jpg",
      alt : "Gyeongbokgung",
      title : "경복궁",
      subtitle : "경복궁 나들이",
      userIcon : "/img/usericon.png",
      nickname : "김성준",
      date : "2023. 10. 21"
    },
    {
      src : "/img/busan.jpg",
      alt : "busan",
      title : "부산",
      subtitle : "부산 국밥투어",
      userIcon : "/img/usericon.png",
      nickname : "김민준",
      date : "2023. 10. 21"
      
    },
    {
      src : "/img/Egypt.jpg",
      alt : "Egypt",
      title : "이집트",
      subtitle : "이집트 피라미드 낙타 체험",
      userIcon : "/img/usericon.png",
      nickname : "최다정",
      date : "2023. 10. 20"
    },
    {
      src : "/img/Eiffel_Tower.jpg",
      alt : "Eiffel_Tower",
      title : " 에펠탑",
      subtitle : "에펠탑 좋은 자리 찾는법",
      userIcon : "/img/usericon.png",
      nickname : "류창민",
      date : "2023. 10. 18"
    },
    {
      src : "/img/Hong_Kong.jpg",
      alt : "Hong_Kong",
      title : "홍콩 거리",
      subtitle : "영화속 홍콩 거리 찾기 ",
      userIcon : "/img/usericon.png",
      nickname : "황수하",
      date : "2023. 10. 15"
    },
    {
      src : "/img/Sydney.jpg",
      alt : "Sydney",
      title : "시드니 오페라하우스",
      subtitle : "오페라 하우스 주변 관광",
      userIcon : "/img/usericon.png",
      nickname : "김성준",
      date : "2023. 10. 05"
    },
    {
      src : "/img/thailand.jpg",
      alt : "thailand",
      title : "방콕",
      subtitle : "방콕 맛집을 찾아보자",
      userIcon : "/img/usericon.png",
      nickname : "김민준",
      date : "2023. 10. 04"
    },
    {
      src : "/img/Turkye.jpg",
      alt : "Turkye",
      title : "틔르키에",
      subtitle : "터키 아니죠~ 틔르키에 ",
      userIcon : "/img/usericon.png",
      nickname : "최다정",
      date : "2023. 09. 30"
    },
    {
      src : "/img/Tokyo.jpg",
      alt : "Tokyo",
      title : "도쿄",
      subtitle : "교토 아니죠~ 도쿄 ",
      userIcon : "/img/usericon.png",
      nickname : "류창민",
      date : "2023. 09. 27"
    },
    {
      src : "/img/Hawaii.jpg",
      alt : "Hawaii",
      title : "하와이",
      subtitle : "니가가라 하와이 ",
      userIcon : "/img/usericon.png",
      nickname : "황수하",
      date : "2023. 09. 25"
    },
   
  ]


  return (
    <Row xs={1} md={3} className="g-4">
      {cardArr.map((v, idx) => (
        <Col key={idx}>
          {/* card 누르면 이동하기  */}
          <Link to={`/post/${v.title}?imgUrl=${v.src}`}>
            <CardStyle 
            imgUrl={v.src} 
            imgHeight="180px" 
            imgWidth="180px" 
            title={v.title}
            subtitle={v.subtitle} 
            usericon={v.userIcon} 
            nickname={v.nickname} 
            date={v.date}/> 
            </Link>
        </Col>
      ))}
    </Row>
  );
  
}







export default Grid;