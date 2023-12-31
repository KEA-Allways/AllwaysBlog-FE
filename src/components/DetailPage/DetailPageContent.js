import React, { useEffect, useState } from "react";
import { CommonColorButton, CommonDeleteButton } from "../../common";
import styled from "@emotion/styled";
import styles from "./DetailPageBody.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DetailPageContent =( postSeq )=> {
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const editButtonClicked = (postSeq) => {
    const theme = '선택된 테마';
    navigate('/post', { state: { postSeq: postSeq, themplateSeq: undefined, theme: theme } });
  };

  const apiGetPost = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts/1`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('API GET request error: ', error);
      });
  };

  useEffect(() => {
    apiGetPost();
  },[postSeq]);
    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styled.thumbImgBox}>
              <img src={post.thumbImg} alt="게시글 썸네일" style={{ borderRadius: '15px', width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} />
            </div>
          </div>
          <div className={styles.contentBox}>
          <h1>{post.title}</h1>
          {/* 날짜 수정 삭제  */}
          <div style={{ display: 'flex',   alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {post.nickname} | {post.postDate}
            </div>
            <div style={{ display: 'flex',   alignItems: 'center' }}>
              <EditButton onClick={() => editButtonClicked(post.postSeq)}>수정 </EditButton> 
              <DeleteButton>삭제</DeleteButton>
            </div>
            
          </div>
          <hr/>
          {/* 메인 내용 보여주기  */}
          {/* <div>
            {post.content}
          </div> */}
          <div>
          <h3>친구와 부산여행 다녀온 후기 공유해요!ㅎㅎㅎ</h3>
          <p>2019년 1월 초에 다녀와서 벌써 부산을 다녀온지 10개월이 다 되어가네요 ㅠ..ㅠ</p>
          <p>코로나로 인해 여행을 자제하다 보니..</p>
          <p>지난 여행 사진들을 보면서 추억앓이 하며 버티고 있어요 ㅎㅎㅎㅎ</p>

          <h3>[1일차] 서울 KTX >> 부산 남포동 포장마차</h3>

          <p>퇴근 후, 친구와 함께 서울역에서 ktx를 타고 부산으로 이동했어요</p>
          <p>숙소는 남포동에 위치한 GnB HOTEL로 잡았어요.</p>
          <p>도착시간이 늦어서 밤늦게 여자둘이 이동하기 어려워서 숙소 근처에는 남포동 포장마차 가려고 숙소를 남포동을 잡았어요 ㅎㅎㅎㅎㅎㅎㅎ</p>

          <p>남포동 포장마차 거리에서 괜찮아 보이는 곳으로 들어갔어요</p>
          <p>저희는 30번 포장마차로 ㄱㄱㄱㄱㄱㄱ</p>
          <p>포장마차라서 안주가 저렴할 줄 알았는데 생각보다 엄청 싸진 않았어요 ㅠ..ㅠ</p>
          <p>그래도 부산에 왔으니 해산물과 대선소주 마시며 여행을 시작했어요 ㅎㅎㅎㅎㅎㅎㅎㅎ</p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/img/detailPage1.jpg" alt="꼬막과 꼼장어 이미지" width={'100%'}/>
          </div>
          
          <p>꼬막과 꼼장어 (냉동꼼장어예요..ㅠ..ㅠ)</p>

          <h3>[2일차] 쌍둥이국밥 >> 해운대 >> 용궁사 >> 남포동 자갈치시장</h3>

          <p>전날 술을 많이 먹지 않아서 숙취가 심하지 않아서 가볍게 쌍둥이 국밥으로 해장하고 2일차 여행 시작 ㄱㄱㄱㄱㄱㄱ</p>
          <p>국밥을 먹고 부산하면 떠오르는 해운대로 갔어요! ㅎㅎㅎㅎ</p>
          <p>겨울바다라 춥긴 했지만, 부산에 갔으니 해운대를 꼭 가야한다며 친구랑 해운대 바다 아주 잠깐 감상하고</p>
          <p>해운대역 뒷쪽에 ‘해리단길’에 위치한 레이크커피바에서 처음보는 메뉴를 주문했어요 ㅎㅎㅎㅎㅎ</p>
          <p>플랫브라운과 포레스트라는 커피인데, 오직 이곳에서만 맛볼 수 있는 메뉴라서 좋더라구요(지금 찾아보니 매장이 부산에서 서울 합정으로 이전했다고 하네요ㅠ..ㅠ 아숩아숩…..)</p>
          <p>친구와 저 둘다 종교가 불교라서, 부산에서 가장 유명한 용궁사라는 절에 갔어요. ㅎㅎㅎㅎ</p>
          <p>용궁사가.. 부산에서 다녀온 곳 중에 가장 좋고 기억에 남는 곳이였어요 부산가면 꼭 꼭 꼭!!!! 가보세요!!!!!!</p>
          <p>그리고 2일차의 마지막은 숙소가 있는 남포동 자갈치시장으로 와서 꼼장어를 먹으려고 했으나..</p>
          <p>꼼장어가 진짜 많이 비싸더라구요ㅠ..ㅠ 관광지라 그런건지… 너무 비싸서 친구랑 조개구이 먹고 마무리했어요(조개구이도 비싸요)</p>
          <p>갠적으로 자찰치 시장.. 가격대가 비싸서 그냐 서울 맛있는 집에서 먹는게 좋을 거 같다고 생각했어요  ㅎㅎㅎㅎㅎㅎㅎ</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/img/detailpage2.jpg" alt="국밥" width={'100%'}/>
          </div>
          
          
          <p>쌍둥이 국밥.. (친구는 돼지고기 냄새 난다고 잘 못먹더라규요 ㅠ..ㅠ)</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/img/detailpage3.jpg" alt="해운대" width={'100%'}/>
          </div>
          
          <p>해운대</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/img/detailpage4.jpg" alt="용궁사" width={'100%'}/>
          </div>
          
          <p>용궁사</p>
          <p>자갈치시장 조개구이(중 짜리인데도 양도 많지 않고 비싸요ㅠ..ㅠ)</p>

          <h3>[3일차] 남포동 BIFF거리 >> 서면역 기장손칼국수 >> 집으로 GOGO</h3>

          <p>마지막 날, 남포동 숙소에서 짐을 챙기고 BIFF 거리를 구경하며</p>
          <p>그 유명하다는 비빔당면과 분식(떡볶이, 오뎅)을 먹고 기차타러 가기 전 서면역에 잠시 들렀어요.</p>
          <p>부산에서 가장 핫하다는 서면역이였지만 낮게 갔더니 뭔가 특별한 게 없고</p>
          <p>그냥 도시더라고요ㅎㅎㅎㅎㅎ 그래서 인터넷으로 급 검색해서 서면에서 오래된 맛집이라고 되어있는</p>
          <p>기장손칼국수를 먹었어요 ㅎㅎㅎㅎㅎ 배가 고프지 않아서 손칼국수만 먹었는데 대박</p>
          <p>가격이 5000원! 진한 멸치육수의 맛에 칼국수가 진짜 맛있었어요ㅎㅎㅎㅎㅎ</p>
          <p>이렇게 배를 든든히 채우고.. 여행을 마무리하고 집으로 돌아갔어요!</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/img/detailpage5.jpg" alt="떡뽁이" width={800} height={600}/>
          </div>
          <p>BIFF 길거리 떡볶이</p>

          <p>부산에만 있는 특별한 것들을 먹으려고 했는데</p>
          <p>그렇게 따지다 보니 대부분의 음식들이 서울에도 다 팔고 있더라구요 ㅠ..ㅠ</p>
          <p>그래서 특별한 것을 많이 먹진 못했지만, 기분전환하고 쉬엄쉬엄 휴식하러 잘 다녀온 것 같아요!</p>

          <p>2박3일동안 2인 경비가 약 55만원정도 든 거 같아요ㅎㅎㅎ ㅎㅎㅎ</p>
          <p>KTX 왕복비용(약22만원) + 숙소(13만원) + 먹거리(20만원)</p>

          <p>조잡스러운 저의 부산여행후기 읽어주셔서 감사합니다 ㅎㅎㅎ</p>
          <p>부산 여행하시는 분들한테 조금이라도 도움이 되었으면 좋겠어요 ㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
  

         </div>
      </div>
      </div>
      
    )
}

export default DetailPageContent

const EditButton = styled(CommonColorButton)`
  width: 20px;
  height: 40px;
  font-size: 12pt;
  margin-right: 10px;

`

const DeleteButton = styled(CommonDeleteButton)`
  width: 20px;
  height: 40px;
  font-size: 12pt;

`