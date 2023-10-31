import {Col, Container, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";
import { CommonButton } from "../../common";
import styles from "./BlogBody.module.css";
import CardStyle from "../PostCard/CardStyle";
import ListStyle from "../PostCard/ListStyle";
import { useNavigate, Link } from 'react-router-dom';
import Paging from '../../components/Paging/Paging';
import ViewList from '@mui/icons-material/ViewList';
import ViewModule from '@mui/icons-material/ViewModule';


const itemsPerPage = 3;

const BlogBody = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState('gridList');
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setLists] = useState([]);

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

  const apiGetPosts = (page, itemsPerPage) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts/main`)
      .then((response) => {
        setLists(response.data.posts);
        console.log(list)
      })
      .catch((error) => {
        console.error('API GET request error:', error);
      });
  };

  useEffect(() => {
    apiGetPosts(currentPage);
  }, [currentPage]);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = list && list.length > 0 ? list.slice(startIndex, endIndex) : [];

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
            <CommonButton sx={{marginRight:"10px"}} onClick={() => editButtonClicked(0)}>글 작성하기</CommonButton>
          </div>
          <br></br>

          {showContent === "gridList" && (
            <Row xs={1} md={3} className="g-6">
            {displayedData.map((blg, index) => (
              <Col key={index}>
                <Link to={`/post/${blg.postSeq}`}>
                <CardStyle
                  imgUrl={blg.thumbImg}
                  imgHeight="180px"
                  imgWidth="200px"
                  title={blg.title}
                  subtitle={blg.subtitle}
                  nickname={blg.nickname}
                  opacityValue="80%"
                  date={blg.postDate}
                  profile={blg.profileImg}/>
                </Link>
              </Col>
            ))}
          </Row>
          )}
          
          {showContent === "lineList" && (
            <Row lg="1" xl="1" className="g-6">
            {displayedData.map((blg, index) => (
              <Col key={index}>
                <Link to={`/post/${blg.postSeq}`}>
                  <ListStyle
                    imgUrl={blg.thumbImg}
                    imgHeight="180px"
                    imgWidth="200px"
                    title={blg.title}
                    subtitle={blg.subtitle}
                    usericon={blg.userIcon}
                    nickname={blg.nickname}
                    profile={blg.profileImg}
                    opacityValue="80%"
                    date={blg.postDate}/>
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
          {list && list.length > 0 ? (
            <Paging
              activePage={currentPage}
              totalItemsCount={list.length}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          ) : (
            <p></p> // 데이터가 없을 경우 메시지 표시
          )}
        </div>
    </Container>
  );
};

export default BlogBody;