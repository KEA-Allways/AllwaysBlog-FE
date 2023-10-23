import React, { useEffect, useState, useRef } from "react";
import LoginPageTopbar from "./LoginPageTopbar";
import DefaultTopbar from "./DefaultTopbar";

const  Topbar = ({page}) => {
  const [PageType, setPageType] = useState(null);
  const pageArr = ["", "main", "login"];

  useEffect( () => {
    console.log(page)
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
          main : <DefaultTopbar page="main"/>,
          login : <LoginPageTopbar/>
          
        } [PageType]
      }
      
      
    </div>
    
  );
}

export default Topbar;



