import React, { useEffect, useState, useRef } from "react";
import LoginPageTopbar from "./LoginPageTopbar";
import DefaultTopbar from "./DefaultTopbar";
import BlogTopbar from "./BlogTopbar";

const  Topbar = ({page, isLogin, hasBlog, username}) => {
  const [PageType, setPageType] = useState(null);
  const pageArr = ["", "main", "login", "blog", "mngt"];

  useEffect( () => {
    if (page != null && page != ""){
      setPageType(page);
    }
    
    if (!pageArr.includes(page)){
      setPageType(null);
    }
  }, [page, PageType])

  return (
    <div style={{position:"relative", zIndex: 999}}>
      {
        {
          "" : <DefaultTopbar/>,
          null : <DefaultTopbar />,
          blog : <BlogTopbar isLogin={isLogin} hasBlog={hasBlog} username={username}/>,
          mngt : <BlogTopbar isLogin={isLogin} hasBlog={hasBlog} username={username}/>,
          main : <DefaultTopbar page="main" isLogin={isLogin}/>,
          login : <LoginPageTopbar/>
          
        } [PageType]
      }
      
      
    </div>
    
  );
}

export default Topbar;



