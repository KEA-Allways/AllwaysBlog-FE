import {motion} from "framer-motion";
 
import Item from './SidebarItem';
import { useEffect, useState } from 'react';
import styles from "./Sidebar.module.css";
import TextStyles from "../../components/Text.module.css";
import { CommonButton } from '../../common';
import styled from "@emotion/styled";

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

function ManageSidebar({ HeaderTitle, HeaderButton, BodyContainer}) {

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  }

  const sideContainerVariants = {
    true : {
      width : "15rem"
    },
    false : {
      transition : {
        delay : 0.6
      }
    }
  }

  const sidebarVariants = {
    true : {},
    false : {
      width : "3rem",
      transition : {
        delay : 0.4
      }
    }
  }

  const profileVariants = {
    true : {
      alignSelf : "center",
      width : "4rem"
    },
    false : {
      alignSelf : "flex-start",
      marginTop : "2rem",
      width : "3rem"
    },
  }

  const [IsHeaderButton, setIsHeaderButton] = useState(false);

  useEffect( () => {
    if(HeaderButton != null && HeaderButton != ""){
      setIsHeaderButton(true);
    }
  }, []);


  return (
    <div className={styles.App}>
      {/* 사이드바 컨테이너 박스 */}
      <motion.div 
        data-Open = {open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className={styles.sidebarContainer}>
        {/* 사이드바 박스 */}
        <motion.div 
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
          className={styles.sidebar}>
          {/* 라인 아이콘 */}
          <motion.div
            whileHover={{
              scale : "1.2",
              backgroundColor : "rgba(255,255,255,0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter : "blur(3.5px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }} 
            onClick={handleToggle}
            className={styles.linesIcon} 
          >
 
          </motion.div>
           
           {/* 프로필 */}
           <motion.div className={styles.profile}
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            transition={{duration : 0.4}}
            whileHover={{
              backgroundColor : "rgba(255,255,255,0.3)",
              boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter : "blur(5.5px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              cursor : "pointer"
            }}>
              <img src='/img/usericon.png' alt='profile_img'/>
          </motion.div>
          {/* 그룹 1 */}
          <div className={styles.groups}>
            <div className={styles.group}>
              <Item name="블로그 관리 홈" path="/mngt"/>  
              <Item name="글 관리" path="/mngt/content"/> 
              <Item name="테마 관리" path="/mngt/theme"/>
              <Item name="템플릿 관리" path="/mngt/template"/>  
              <Item name="통계" path="/mngt/static"/> 
            </div>  
          </div>
        </motion.div>
        
      </motion.div>
      <div className={styles.bodyContainer} style={{ marginRight: "50px", marginLeft: "50px", marginTop: "30px"}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className={TextStyles.h3}>
                {HeaderTitle}
            </h3>
            {IsHeaderButton && (
              <PlusButton variant="contained" size="small">{HeaderButton}</PlusButton> 
            )}
            
        </div>
        <div style={{ marginBottom: "20px"}}>
            <hr className={TextStyles.hr} />
        </div>
        <div>
            {BodyContainer}
        </div>
      </div>
    </div>
   
  );
}

export default ManageSidebar;
