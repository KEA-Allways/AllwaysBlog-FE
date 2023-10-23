import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import {CommonButton } from "../../common"
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { common } from "@mui/material/colors";


function BlogSidebar({body}) {
  const {themeId, listId} = useParams();
  

  const pathName = useLocation().pathname;
  const [menuStates, setMenuStates] = useState({});
  const [newMenuItemName, setNewMenuItemName] = useState("");
  const [isAddingSubMenu, setIsAddingSubMenu] = useState(false);
  const [selectedParentMenu, setSelectedParentMenu] = useState(null);
  const [showInputBox, setShowInputBox] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [themeAndLists, setThemeAndLists] = useState([]);
  const [listSeq, setListSeq] = useState(4);

  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const selectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setProfileImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }

    const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result);
          alert(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    };

  const apiGetProfile = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/1`)
      .then((response) => {
        setProfiles([response.data.blogName, response.data.email]);
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
                src={profileImage}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <ProfileUpload
                type="file"
                accept="image/*"
                name="profile_img"
                onChange={selectFile}
                ref={fileInput}
              />
              
              {/* 블로그 소개, 이메일 */}
              <ProfileBox>
                <p className={styles.blogName}>{profiles[0]}</p>
                <small className={styles.emailName}>{profiles[1]}</small> 
              </ProfileBox>
              
              {/* 테마 1 */} 
              <div className={styles.groups}>
                <div className={styles.group}>
                  {/* 리스트 시작 */}
                  <ul style={{ width: "100%", height: "auto" }}>
                    {themeAndLists.map((tal) => (
                      // 테마
                      <li key={tal.themeSeq} style={{width : "100%"}}>
                        <Link
                          to={`/blogs/themes/${tal.themeSeq}`}
                          className={`/blogs/themes/${tal.themeSeq}` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                          onClick={() => toggleMenu(tal.themeName)}
                        >
                          {tal.themeName}
                        </Link>
                        {menuStates[tal.themeName] && (
                          
                          <ul style={{ width: "100%", height: "auto", textAlign: "start",}}>
                            {tal.lists.map((list) => (
                              // 카테고리
                              <li key={list.listSeq}>
                                <Link
                                  to={`/blogs/themes/${tal.themeSeq}/lists/${list.listSeq}`}
                                  className={`/blogs/themes/${tal.themeSeq}/lists/${list.listSeq}` === pathName ? `${styles.active} ${styles.categoryText}` : styles.categoryText}
                                >
                                  {list.listName}
                                </Link>
                              </li>
                            ))}
                            <li>
                              
                              {/* 입력창 */}
                              {showInputBox ? (
                                <form>
                                  <input
                                  type="text"
                                  style={{width : "80%"}}
                                  placeholder="하위 메뉴 이름"
                                  value={newMenuItemName}
                                  autoFocus
                                  onChange={(e) => setNewMenuItemName(e.target.value)}
                                  />
                                {/* 입력확인버튼 */}
                                  <SaveButton onClick={handleAddMenuItem}>저장</SaveButton>
                                </form>
                                
                              ) : (
                                <PlusButton onClick={() => handleAddSubMenu(tal.themeName)}>+</PlusButton> 
                              )}
                  
                            </li>
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

  border-bottom: 1px solid rgba(0,0,0,0.18);
`;

const ProfileUpload = styled.input`
  display: none;
`;

const Profile = styled.img`
  box-shadow: 1px 1px 15px -5px black;

  border-radius: 50%;

  cursor: pointer;

  width: 120px;

  margin: 60px 10px 30px 10px; 

  cursor: pointer;

  height: 120px;

  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);

    transition: 0.5s;
  }
`;

const PlusButton = styled.button`
  background-color:white;
  color:black;
  width: 30px;
  height: 30px;
  border-color:black;
  font-size: 16px;
  display: flex;
  text-align : center;
  justify-content: center;
  align-items: center;
  &:hover {
    color: red;
  }
`;

const SaveButton = styled.button`
  width : 20%;
`


export default BlogSidebar;