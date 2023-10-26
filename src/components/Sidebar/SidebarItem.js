import React from "react";
import {motion} from "framer-motion";
import styles from "./SidebarItem.module.css";


function SidebarItem({icon, name, path, selected, onClicked}){
    const subheading = {
        true : {
            opacity : 1
        },
        false : {
            opacity : 0,
            display : "none"
        }
    }

    const handleBtnClick = () => {
        window.location.href = path;
    }
    // {`${styles.item} ${selected ? styles.active : ''}`}
    return (
        <motion.div 
            onClick={()=> {
                onClicked(path);
                handleBtnClick();
                
            }}
            className={`${styles.item} ${selected ? styles.selected : ''} `}
            whileHover={{
              backgroundColor : "rgba(255,255,255,0.3)",
              boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter : "blur(5.5px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              cursor : "pointer"
            }}
            whileTap={{
                // 클릭된 "active" 상태에서의 스타일
                backgroundColor: "rgba(0, 0, 255, 0.3)", 
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(5.5px)",
                WebkitBackdropFilter: "blur(5.5px)",
                border: "1px solid rgba(0, 0, 255, 0.18)", 
                cursor: "pointer",
            }}
            transition={{
                type:"none", duration:0.1
            }}
        >
            <motion.div className={styles.icon}>
                {icon}
            </motion.div>
        
            <motion.span
            variants={subheading}>
                {name}
            </motion.span>
        </motion.div>
    )
}

export default SidebarItem;


