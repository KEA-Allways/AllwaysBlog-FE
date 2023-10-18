import {Col, Row} from 'react-bootstrap';
import CardStyle from '../PostCard/CardStyle';

const Grid = () => {

  const cardArr = [

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
    // {
    //   src : "/img/mpc1.png",
    //   alt : "HTML",
    //   title : "HTML",
    //   subtitle : "HTML에 대해 알아보자",
    //   userIcon : "/img/usericon.png",
    //   nickname : "김성준"
    // },
    // {
    //   src : "/img/mpc2.png",
    //   alt : "CSS",
    //   title : "CSS",
    //   subtitle : "CSS 는 어떨까?",
    //   userIcon : "/img/usericon.png",
    //   nickname : "김민준"
    // },
    // {
    //   src : "/img/mpc3.jpeg",
    //   alt : "js",
    //   title : "JS ",
    //   subtitle : "프론트의 꽃 JS",
    //   userIcon : "/img/usericon.png",
    //   nickname : "최다정"
    // },
    // {
    //   src : "/img/mpc4.png",
    //   alt : "react",
    //   title : " React",
    //   subtitle : "React는 쉬운가요?",
    //   userIcon : "/img/usericon.png",
    //   nickname : "류창민"
    // },
    // {
    //   src : "/img/mpc5.svg",
    //   alt : "nodejs",
    //   title : "Node JS",
    //   subtitle : "Node js 스프링부트 둘중에 뭐하지?",
    //   userIcon : "/img/usericon.png",
    //   nickname : "황수하"
    // },
    // {
    //   src : "/img/mpc6.png",
    //   alt : "springboot",
    //   title : "Springboot",
    //   subtitle : "Springboot 의 MVC 패턴",
    //   userIcon : "/img/usericon.png",
    //   nickname : "김성준"
    // },
    // {
    //   src : "/img/mpc7.svg",
    //   alt : "MYSQL",
    //   title : "MYSQL",
    //   subtitle : "RDBMS의 꽃",
    //   userIcon : "/img/usericon.png",
    //   nickname : "김민준"
    // },
    // {
    //   src : "/img/mpc8.png",
    //   alt : "mariaDB",
    //   title : "mariaDB",
    //   subtitle : "물개 귀여움 주의",
    //   userIcon : "/img/usericon.png",
    //   nickname : "최다정"
    // },
    // {
    //   src : "/img/mpc9.png",
    //   alt : "MongoDB",
    //   title : "MongoDB",
    //   subtitle : "NoSQL 의 꽃",
    //   userIcon : "/img/usericon.png",
    //   nickname : "류창민"
    // },
    // {
    //   src : "/img/mpc10.png",
    //   alt : "레디스",
    //   title : "Redis",
    //   subtitle : "인메모리 데이터 ",
    //   userIcon : "/img/usericon.png",
    //   nickname : "황수하"
    // },
  ]


  return (
    <Row xs={1} md={3} className="g-4">
      {cardArr.map((v, idx) => (
        <Col key={idx}>
            <CardStyle imgUrl={v.src} imgHeight="180px" imgWidth="180px" title={v.title} subtitle={v.subtitle} usericon={v.userIcon} nickname={v.nickname} /> 
        </Col>
      ))}
    </Row>
  );
}

export default Grid;