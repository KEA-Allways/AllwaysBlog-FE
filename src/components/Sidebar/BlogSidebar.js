import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import {CommonButton } from "../../common"
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import sideBarStyles from '../Sidebar/Sidebar.module.css';
import axios from "axios";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


function BlogSidebar({body}) {
  const {themeId, listId} = useParams();
  

  const backgroundImg1 = "https://allways-image.s3.ap-northeast-2.amazonaws.com/test-img/main-img/cookBg.jpeg";
  const backgroundImg2 = "https://allways-image.s3.ap-northeast-2.amazonaws.com/test-img/main-img/Sydney.jpg";

  const pathName = useLocation().pathname;
  const [menuStates, setMenuStates] = useState({});
  const [newMenuItemName, setNewMenuItemName] = useState("");
  const [isAddingSubMenu, setIsAddingSubMenu] = useState(false);
  const [selectedParentMenu, setSelectedParentMenu] = useState(null);
  const [showInputBox, setShowInputBox] = useState(false);
  const [profiles, setProfiles] = useState({});
  const [themeAndLists, setThemeAndLists] = useState([]);
  const [listSeq, setListSeq] = useState(4);

  const apiGetProfile = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/user_id`)
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error('API GET request error:', error);
      });
  };

  const apiGetThemeAndList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/themes/1`)
      .then((response) => {
        setThemeAndLists(response.data.themes);
      })
      .catch((error) => {
        console.error('API GET request error:', error);
      });
  };

  useEffect(() => {
    apiGetProfile();
    apiGetThemeAndList();
  },[])

  const initializeMenuStates = () => {
    const initialMenuStates = {};
    themeAndLists.forEach((tal) => {
      initialMenuStates[tal.themeName] = false;
    });
    setMenuStates(initialMenuStates);
  };

  useState(() => {
    initializeMenuStates();
  },[])
  
  // 사용자가 테마를 눌렀을 때 테마별 카테고리가 보이게한다.
  const toggleMenu = (menu) => {

    //백그라운드 이미지 설정 
    if(menu ==="소소한 요리 기록") {
      document.documentElement.style.setProperty('--background-image', `url(${backgroundImg1})`);
    } else if(menu === "여행 다이어리"){
      document.documentElement.style.setProperty('--background-image', `url(${backgroundImg2})`);
    }
    


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

  // 버튼을 눌렀을 때 하위 메뉴를 추가하게 하는 함수
  const handleAddMenuItem = () => {
    if (isAddingSubMenu) {
      // 하위 메뉴 추가 중
      const updatedMenuData = [...themeAndLists];
      setListSeq(listSeq+1)
      const newSubMenu = {
        listSeq : listSeq, 
        listName: newMenuItemName,
        // listOrder : 4, // 이건 드래그해서 바꿔지게끔.
        // to: `/${selectedParentMenu}/${newMenuItemName}`,
      };
      updatedMenuData.forEach((theme) => {
        if (theme.themeName === selectedParentMenu) {
          theme.lists.push(newSubMenu);
        }
      });
      
      setThemeAndLists(updatedMenuData); // 업데이트된 메뉴 데이터를 상태로 설정
      setNewMenuItemName("");
      setShowInputBox(false); // 입력 상자를 숨깁니다.
    } 
  };
  
  // 부모의 아래에 하위 메뉴 추가하는 함수
  const handleAddSubMenu = (parentMenu) => {
    setSelectedParentMenu(parentMenu);
    setIsAddingSubMenu(true); // 하위 메뉴 추가 모드로 설정
    setShowInputBox(true); // Show the input box
  };


  return (
    <>
      <div className={styles.App}>
        {/* 사이드바 컨테이너 박스 */}
        <div className={styles.sidebarContainer}>
          {/* 사이드바 박스 */}
          <div className={styles.sidebar}>
              {/* 프로필 이미지 */}
              <Profile
                src={profiles.profileImg}
              />
              
              {/* 블로그 소개, 이메일 */}
              <ProfileBox>
                <p className={styles.blogName}>{profiles.nickname}의 {profiles.blogName}</p>
                <small>{profiles.description}</small><br/>
                <Link to="/mngt" className={styles.emailName}> {profiles.email}@allways.com</Link> 
              </ProfileBox>
              
              {/* 테마 1 */} 
              <div className={styles.groups}>
                <div className={styles.group}>
                  {/* 리스트 시작 */}
                  <ul style={{ width: "100%", height: "auto" }}>
                    {themeAndLists.map((tal) => (
                      // 테마
                      <li key={tal.themeSeq} style={{width : "100%", marginLeft:"20px"}}>
                        <Link
                          to={`/blogs/themes/${tal.themeSeq}`}
                          className={`/blogs/themes/${tal.themeSeq}` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
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
                              
                          
                  


                            {tal.lists.map((list) => (
                              // 카테고리
                              <li key={list.listSeq} style={{marginBottom : 5}}>
                                <Link
                                  to={`/blogs/themes/${tal.themeSeq}/lists/${list.listSeq}`}
                                  className={`/blogs/themes/${tal.themeSeq}/lists/${list.listSeq}` === pathName ? `${styles.categoryActive} ${styles.categoryText}` : styles.categoryText}
                                >
                                  {list.listName}
                                </Link>
                              </li>
                            ))}

                             {/* 카테고리 상세 입력창 */}
                             {showInputBox ? (
                                <form>
                                  <Input
                                  type="text"
                                  placeholder="하위 메뉴 이름"
                                  value={newMenuItemName}
                                  autoFocus
                                  onChange={(e) => setNewMenuItemName(e.target.value)}
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