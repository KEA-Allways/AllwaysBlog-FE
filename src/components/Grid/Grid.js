import {Col, Row} from 'react-bootstrap';
import CardStyle from '../PostCard/CardStyle';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from "react";
import axios from "axios";

const Grid = () => {
  const [list, setLists] = useState([]);

  const apiGetPosts = () => {
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
    apiGetPosts();
  }, []);

  return (
    <Row xs={1} md={3} className="g-4">
      {list.map((v, idx) => (
        <Col key={idx}>
          {/* card 누르면 이동하기  */}
          <Link to={`/post/${v.postSeq}`}>
            <CardStyle 
            imgUrl={v.thumbImg} 
            imgHeight="180px" 
            imgWidth="180px" 
            title={v.title}
            subtitle={v.subtitle} 
            nickname={v.nickname} 
            opacityValue="100%"
            date={v.postDate}
            profile={v.profileImg}/> 
            </Link>
        </Col>
      ))}
    </Row>
  );
  
}







export default Grid;