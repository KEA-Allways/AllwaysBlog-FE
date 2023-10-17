import {motion} from "framer-motion";
import {BarChartRounded, DashboardRounded, TocRounded} from '@material-ui/icons';
import Item from './SidebarItem';
import { useState } from 'react';
import styles from "./Sidebar.module.css";

function BlogSidebar() {

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
      width : "100px",
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
               {/* <img src="/img/backIcon.jpg"  width="35px" height="35px" margin="15px"/>  */}
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
              <motion.h3
                animate = {{opacity : open ? 1 : 0, height : open ? 'auto' : 0}}
                >테마1</motion.h3>
              <Item name="카테고리1" />  
              <Item name="카테고리2" />  
            </div>  
          </div>  
        </motion.div>
        
      </motion.div>
      <div className={styles.bodyContainer}>

      </div>
    </div>
   
  );
}

export default BlogSidebar;
