import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import TextStyles from "../../components/Text.module.css";
import { CommonButton } from '../../common';
import styles from "./Sidebar.module.css";



function ManageSidebar({ HeaderTitle, HeaderButton, HeaderAction, BodyContainer}) {
  const pathName = useLocation().pathname;
  const [IsHeaderButton, setIsHeaderButton] = useState(false);

  useEffect( () => {
    if(HeaderButton != null && HeaderButton != ""){
      setIsHeaderButton(true);
    }
  }, []);


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

    const headerButtonClicked = () => {
      if (HeaderAction) {
        HeaderAction();
      }
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
                  <p className={styles.blogName}>우당탕탕 블로그</p>
                  <small className={styles.emailName}>testEmail</small> 
                </ProfileBox>
                
                {/* 사이드바 메뉴 */} 
                <div className={styles.groups}>
                  <div className={styles.group}>
                    {/* 각 메뉴들 */}
                    <ul style={{ width: "100%", height: "auto" }}>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt`}
                          className={`/mngt` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                        >
                          블로그 관리 홈
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/content`}
                          className={`/mngt/content` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                        >
                          글 관리
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/theme`}
                          className={`/mngt/theme` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                        >
                          테마 관리
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/template`}
                          className={`/mngt/template` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                        >
                          템플릿 관리
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/static`}
                          className={`/mngt/static` === pathName ? `${styles.active} ${styles.themeText}` : styles.themeText}
                        >
                          통계
                        </Link>
                      </li>
                                        
                    </ul>
                  </div>
                </div> 
            </div> {/*사이드바 끝 */}
            
          </div> {/*사이드바 컨테이너 끝 */}
          {/* 바디 컨테이너 시작 */}
          <div className={styles.bodyContainer} style={{ marginRight: "50px", marginLeft: "50px", marginTop: "30px"}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={TextStyles.h3}>
                    {HeaderTitle}
                </h3>
                {IsHeaderButton && (
                  <PlusButton variant="contained" size="small" onClick={headerButtonClicked}>{HeaderButton}</PlusButton> 
                  // HeaderButton
                )}
                
            </div>
            <div style={{ marginBottom: "20px"}}>
                <hr className={TextStyles.hr} />
            </div>
            <div>
                {BodyContainer}
            </div>
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

const PlusButton = styled(CommonButton)`
    background-color:white;
    color:black;
    width: 122px;
    height: 40px;
    border-color:black;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    &:hover {
    color: #fff;
    background: black;
    }
`


export default ManageSidebar;
