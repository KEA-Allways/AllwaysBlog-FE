import {Col, Container, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";
import { CommonButton } from "../../common";
import styles from "./BlogBody.module.css";
import CardStyle from "../PostCard/CardStyle";
import ListStyle from "../PostCard/ListStyle";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Paging from '../../components/Paging/Paging';
import ViewList from '@mui/icons-material/ViewList';
import ViewModule from '@mui/icons-material/ViewModule';
import { blogPostStore, blogStore } from '../../store/store';
import { DefaultAxios } from '../../lib/DefaultAxios';

const BlogBody = ({currentPage, setCurrentPage}) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState('gridList');
  // const [currentPage, setCurrentPage] = useState(1);
  const {blogPosts, totalElements, setBlogPosts} = blogPostStore(state => state);
  const {blogMasterName} = blogStore(state => state);
  const userName = localStorage.getItem("userName");
  const isLoginUserBlog = blogMasterName === userName;
  const params = useParams();
  

  // 여기 페이지에서는 항상 새로운 게시글 등록이기에 postSeq로 0을 보낸다
  const editButtonClicked = (postSeq) => {
    const theme = '현재 페이지 테마';
    navigate(`/post/edit/${params.themeSeq}`, { state: { postSeq: postSeq, templateSeq: undefined, theme } });
  };

  const handleButtonClick = (content) => {
        setShowContent(content);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    try{
      const res = await DefaultAxios.get(`/api/post/user/${params.userSeq}/category/${params.categorySeq}?page=${currentPage}&size=10`)
      const data = res.data.result.data;
      setBlogPosts(data.content);
      console.log("params")
      console.log(params.userSeq)
      console.log(params.categorySeq)
      console.log("blog posts 출력 ")
      console.log(blogPosts)
    }catch(e){
      console.log("카테고리 별 포스트 가져오기 에러" + e);
    }
    
  };

  return (
    <Container>
        <Row className="my-5">
          <Col md={1}>

          </Col>
          <Col md={10}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{display : "flex"}}>
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
            {isLoginUserBlog 
            ? <CommonButton sx={{marginRight:"10px"}} onClick={() => editButtonClicked(0)}>글 작성하기</CommonButton>
            : "" }
            
          </div> 
          
          <br></br>

          {showContent === "gridList" && (
            <Row xs={1} md={3} className="g-6">
            {blogPosts.map((blg, index) => (
              <Col key={index}>
                <Link to={`/theme/${params.themeSeq}/post/${blg.postSeq}`}>
                <CardStyle
                  imgUrl={blg.thumbImg}
                  imgHeight="180px"
                  imgWidth="200px"
                  title={blg.postTitle}
                  subtitle={blg.subTitle}
                  nickname={blg.nickname}
                  opacityValue="80%"
                  date={blg.postDate.substr(0,10)}
                  profile={blg.profileImg}/>
                </Link>
              </Col>
            ))}
          </Row>
          )}
          {console.log(blogPosts)}
          {showContent === "lineList" && (
            <Row lg="1" xl="1" className="g-6">
            {blogPosts.map((blg, index) => (
              <Col key={index}>
                <Link to={`/post/${blg.postSeq}`}>
                  <ListStyle
                    imgUrl={blg.thumbImg}
                    imgHeight="180px"
                    imgWidth="200px"
                    title={blg.postTitle}
                    subtitle={blg.subTitle}
                    nickname={blg.nickname}
                    profile={blg.profileImg}
                    opacityValue="80%"
                    date={blg.postDate.substr(0,10)}/>
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
          {blogPosts && blogPosts.length > 0 ? (
            <Paging
              activePage={currentPage}
              totalItemsCount={totalElements}
              onPageChange={handlePageChange}
              itemsPerPage={10}
            />
          ) : (
            <p></p> // 데이터가 없을 경우 메시지 표시
          )}
        </div>
    </Container>
  );
};

export default BlogBody;