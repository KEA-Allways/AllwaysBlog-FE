import {Col, Row} from 'react-bootstrap';
import CardStyle from '../PostCard/CardStyle';
import { Link, useParams } from 'react-router-dom'; 
import { mainPostStore } from '../../store/store';

const Grid = () => {
  // store에 저장되어 있는 메인포스트들 가지고 오기.
  const { tenPosts } = mainPostStore(state => state);
  const params = useParams();
  

  // 화면에 뿌려주기
  return (
    <Row xs={1} md={3} className="g-4">
      {tenPosts.map((v, idx) => (
        <Col key={idx}>
          {/* card 누르면 이동하기  */}
            <CardStyle
            postSeq ={v.postSeq}
            userSeq = {v.userSeq} 
            imgUrl={v.thumbImg} 
            imgHeight="180px" 
            imgWidth="180px" 
            title={v.postTitle}
            subtitle={v.subTitle} 
            nickname={v.nickname} 
            opacityValue="100%"
            date={(v.postDate).substring(0,10)}
            profile={v.profileImg}/> 
        </Col>
      ))}
    </Row>
  );
  
}

export default Grid;