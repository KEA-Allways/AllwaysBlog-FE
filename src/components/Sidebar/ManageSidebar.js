import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import TextStyles from "../../components/Text.module.css";
import { CommonButton } from '../../common';
import styles from "./Sidebar.module.css";
import axios from "axios";
import ThemeModal from "../ThemeModal/ThemeModal";



function ManageSidebar({ HeaderTitle, HeaderButton, HeaderButton2, HeaderAction, BodyContainer}) {
  const pathName = useLocation().pathname;
  const [IsHeaderButton, setIsHeaderButton] = useState(false);
  const [IsHeaderButton2,setIsHeaderButton2] =useState(false);
  const [profiles, setProfiles] = useState({});
 
  const [showModal,setShowModal] = useState(false);
 
  const isTheme = pathName.startsWith("/mngt/theme");
 

  useEffect( () => {
    if(HeaderButton != null && HeaderButton !== ""){
      setIsHeaderButton(true);
    }
    if(HeaderButton2!=null && HeaderButton2 !==""){
      setIsHeaderButton2(true);
    }
  }, []);

    const headerButtonClicked = () => {
      if (HeaderAction) {
        HeaderAction();
      }
    };

    const themeAddButtonClicked = () => {
      setShowModal(true);
    }

    const apiGetProfile = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/user_id`)
        .then((response) => {
          setProfiles(response.data);
        })
        .catch((error) => {
          console.error('API GET request error:', error);
        });
    };
  
    useEffect(() =>{
      apiGetProfile();
    },[])

    return (
      <>
        <div className={styles.App}>
          {/* 사이드바 컨테이너 박스 */}
          <div className={styles.sidebarContainer}>
            {/* 사이드바 박스 */}
            <div className={styles.sidebar}>
              {console.log(profiles)}
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
                
                {/* 사이드바 메뉴 */} 
                <div className={styles.groups}>
                  <div className={styles.group}>
                    {/* 각 메뉴들 */}
                    <ul style={{ width: "100%", height: "auto", marginLeft : "20px"}}>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt`}
                          className={`/mngt` === pathName ? `${styles.mngtActive} ${styles.mngtText}` : styles.mngtText}
                        >
                          블로그 관리 홈
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/content`}
                          className={`/mngt/content` === pathName ? `${styles.mngtActive} ${styles.mngtText}` : styles.mngtText}
                        >
                          글 관리
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/theme`}
                          className={isTheme ? `${styles.mngtActive} ${styles.mngtText}` : styles.mngtText}
                        >
                          테마 관리
                        </Link>
                      </li>
                      <li style={{width : "100%"}}>
                        <Link
                          to={`/mngt/template`}
                          className={`/mngt/template` === pathName ? `${styles.mngtActive} ${styles.mngtText}` : styles.mngtText}
                        >
                          템플릿 관리
                        </Link>
                      </li>             
                    </ul>
                  </div>
                </div> 
            </div> {/*사이드바 끝 */}
            
          </div> {/*사이드바 컨테이너 끝 */}
          {/* 바디 컨테이너 시작 */}
          <div className={styles.bodyContainer} style={{ marginRight: "160px", marginLeft: "150px", marginTop: "30px"}}>
            <div style={{ display : "flex", justifyContent: 'space-between', }}>
                <h3 className={TextStyles.h3}>
                    {HeaderTitle}
                </h3>
                  {/* 버튼 보여주게 하기  */}
                  <div style={{display : "flex", flexDirection : "row", marginTop : "30px"}}>
                    {IsHeaderButton2 && (
                      <CommonButton onClick={themeAddButtonClicked}
                      
                      >{HeaderButton2}</CommonButton>
                    )}
                    {showModal && (
                      <ThemeModal showModal={showModal} onClose={() => setShowModal(false)} />
                    )}
                    {IsHeaderButton && (
                      <CommonButton onClick={headerButtonClicked}
                      
                      >{HeaderButton}
                      </CommonButton>
                    )}
                  </div>
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

const HeaderBtn = styled(CommonButton)`
  margin : 0;
`



export default ManageSidebar;