import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { blogPostStore, blogStore, defaultBlogStore, themeListStore } from "../../store/store";
import { TokenAxios } from "../../lib/TokenAxios";
import Swal from "sweetalert2";
import { DefaultAxios } from "../../lib/DefaultAxios";
import axios from "axios";


function BlogSidebar({body, currentPage}) {
  const {blogProfileImg} = blogStore(state => state);
  
  const backgroundImg1 = "https://allways-image.s3.ap-northeast-2.amazonaws.com/test-img/main-img/cookBg.jpeg";
  const backgroundImg2 = "https://allways-image.s3.ap-northeast-2.amazonaws.com/test-img/main-img/Sydney.jpg";

  const pathName = useLocation().pathname;
  const [menuStates, setMenuStates] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [isAddingSubMenu, setIsAddingSubMenu] = useState(false);
  const [selectedParentMenu, setSelectedParentMenu] = useState(null);
  const [showInputBox, setShowInputBox] = useState(false);
  const {themes} = themeListStore(state => state);
  const {blogInfo} = defaultBlogStore(state => state);
  // const userSeq = localStorage.getItem("userSeq");
  const {userSeq, themeSeq, categorySeq} = useParams();
  const {setBlogPosts} = blogPostStore(state => state)

  const initializeMenuStates = () => {
    const initialMenuStates = {};
    themes.forEach((tal) => {
      initialMenuStates[tal.themeName] = false;
    });
    setMenuStates(initialMenuStates);
  };

  useState(() => {
    initializeMenuStates();
  },[])

  // URL의 themeSeq가 변경되었을 때 실행
  useEffect(() => {
    getThemeImg();
  },[themeSeq])

  // 테마 이미지 가져오는 함수
  const getThemeImg = async() => {
    try{
      const res = await axios(`http://localhost:8001/api/file/theme/${themeSeq}`);
      console.log(res.data.themeImg);
      document.documentElement.style.setProperty('--background-image', `url(${res.data.themeImg})`);
    }catch(e){
      console.log("테마 가져오기 에러" + e);
    }
  }
  // 사용자가 테마를 눌렀을 때 테마별 카테고리가 보이게한다.
  const toggleMenu = (menu) => {

    //백그라운드 이미지 설정 
    // if(menu ==="소소한 요리 기록") {
    //   document.documentElement.style.setProperty('--background-image', `url(${backgroundImg1})`);
    // } else if(menu === "여행 다이어리"){
    //   document.documentElement.style.setProperty('--background-image', `url(${backgroundImg2})`);
    // }

    const updatedMenuStates = { ...menuStates };
    for (const key in updatedMenuStates) {
      if (key !== menu) {
        updatedMenuStates[key] = false;
      }
    }

    updatedMenuStates[menu] = !menuStates[menu];
    setMenuStates(updatedMenuStates);
    setShowInputBox(false);
  };

  const handleAddMenuItem = async () => {
    try {
      // 여러 비동기 작업을 동시에 처리하기 위해 Promise.all 사용
      await Promise.all([
        TokenAxios.post(`/api/theme/${themeSeq}/category`, {
          categoryName: newCategory,
        }),
        new Promise(resolve => {
          // Swal을 사용한 비동기 작업
          Swal.fire({
            title: "카테고리 생성중",
            timer: 5000,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then(() => {
            resolve(); // Promise가 완료될 때까지 기다리게 함
          });
        }),
      ]);
      // 모든 비동기 작업이 완료된 후 실행되는 부분
      setNewCategory(""); // 입력 상자를 비운다.
      setShowInputBox(false); // 입력 상자를 숨긴다.
      window.location.reload();
    } catch (error) {
      console.error("에러 발생!!", error);
    }
  };
  
  
  // 부모의 아래에 하위 메뉴 추가하는 함수
  const handleAddSubMenu = (parentMenu) => {
    setSelectedParentMenu(parentMenu);
    setIsAddingSubMenu(true); // 하위 메뉴 추가 모드로 설정
    setShowInputBox(true); // Show the input box
  };

  // 카테고리 클릭됐을 때 데이터 가져오는 함수
  const handleCategoryClicked = async (categorySeq) => {
      const res = await DefaultAxios.get(`/api/post/user/${userSeq}/category/${categorySeq}?page=${currentPage}&size=10`)
      const data = res.data.result.data;
      setBlogPosts(data.content);
  }


  return (
    <>
      {/* {console.log(process.env.REACT_APP_API_URL)} */}
      <div className={styles.App}>
        {/* 사이드바 컨테이너 박스 */}
        <div className={styles.sidebarContainer}>
          {/* 사이드바 박스 */}
          <div className={styles.sidebar}>
              {/* 프로필 이미지 */}
              <Profile
                src={blogProfileImg}
              />
              {/* {console.log(menuStates)} */}
              {/* 블로그 소개, 이메일 */}
              <ProfileBox>
                <p className={styles.blogName}>{blogInfo.blogName}</p>
                <small>{blogInfo.description}</small><br/>
                <Link to="/mngt" className={styles.emailName}> {blogInfo.email}</Link> 
              </ProfileBox>
              
              {/* 테마 1 */} 
              <div className={styles.groups}>
                <div className={styles.group}>
                  {/* 리스트 시작 */}
                  <ul style={{ width: "100%", height: "auto" }}>
                    {themes.map((tal) => (
                      // 테마
                      <li key={tal.themeSeq} style={{width : "100%", marginLeft:"20px"}}>
                        <Link
                          to={`/blog/${userSeq}/theme/${tal.themeSeq}`}
                          className={`/blog/${userSeq}/theme/${tal.themeSeq}` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                          onClick={() => toggleMenu(tal.themeName)}
                        >
                          {tal.themeName}
                          
                        </Link>
                        {menuStates[tal.themeName] && (
                          
                          <ul style={{ width: "100%", height: "auto", textAlign: "start", marginLeft:"10px", position : "relative" }}>
                             {/* 카테고리 추가  */}
                             
                             {showInputBox ? (
                                 <></>
                              ) : (
                                <PlusButton onClick={() => handleAddSubMenu(tal.themeName)}></PlusButton>
                              )}
                              
                          
                  


                            {tal.categories.map((category) => (
                              // 카테고리
                              <li key={category.categorySeq} style={{marginBottom : 5}}>
                                <Link
                                  onClick={() => handleCategoryClicked(category.categorySeq)}
                                  to={`/blog/${userSeq}/theme/${tal.themeSeq}/category/${category.categorySeq}`}
                                  className={`/blog/${userSeq}/theme/${tal.themeSeq}/category/${category.categorySeq}` === pathName ? `${styles.categoryActive} ${styles.categoryText}` : styles.categoryText}
                                >
                                  {category.categoryName}
                                </Link>
                              </li>
                            ))}

                             {/* 카테고리 상세 입력창 */}
                             {showInputBox ? (
                                <form>
                                  <Input
                                  type="text"
                                  placeholder="하위 메뉴 이름"
                                  value={newCategory}
                                  autoFocus
                                  onChange={(e) => setNewCategory(e.target.value)}
                                  />
                                {/* 입력확인버튼 */}
                                  <SaveIcon onClick={handleAddMenuItem}></SaveIcon>
                                </form>
                                
                              ) : (
                                <></>
                              )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> 
          </div> {/*사이드바 끝 */}
          
        </div> {/*사이드바 컨테이너 끝 */}



        {/* 바디 컨테이너 시작 */}
        <div className={styles.bodyContainer}>
          {body}
        </div>
        {/* 바디 컨테이너 끝 */}
      </div>
    </>
  )
}

const ProfileBox = styled.div`
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 10px;
  width: 100%;
  border-bottom: 2px solid rgba(0,0,0,0.18);
`;

const Profile = styled.img`
  border-radius: 50%;
  cursor: pointer;
  width: 120px;
  margin: 60px 10px 30px 10px; 
  cursor: pointer;
  height: 120px;
  transition: all 0.5s ease;
`;

const PlusButton = styled(AddCircleOutlineOutlinedIcon)`
  position: absolute;
  margin-left: 145px;
  top: -39px;
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  border-color:black;
  text-align : center;
  justify-content: center;
  align-items: center;

  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.15);
    color : white;
  }
`;

const Input = styled.input`
  width: 50%;
  outline : none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  height: 28px;
  padding-left: 8px;
  border: none;
  border-radius: 7px;
  background: #f0f0f0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: 400;
  
  font-size: 13px;

  transition: all 0.5s ease 0s;

  &:hover {
   
  }
`;

const SaveIcon = styled(AddCircleOutlineOutlinedIcon)`
  margin-left: 10px;
  transition: all 0.4s ease;

  &:hover {
   transform: scale(1.15);
   color : white;
  }
`




export default BlogSidebar;