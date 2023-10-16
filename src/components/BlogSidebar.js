import React from "react";
import styled from "styled-components";

const Side = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`
const Profile = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 100%;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`

function BlogSidebar() {
  const menus = [
    { name: "테마", path: "/blogs" },
  ];

  const blogname = "Allways 블로그";
  const blogAddress = "https://dev-sungjun.tistory.com/"
  

  return (
    <Side>
      <Profile src="/img/usericon.png"></Profile>
      <h4>{blogname}</h4>
      <small>{blogAddress}</small>
      <Menu>
        <div>
            <ul style={{listStyle : "none"}}>
                <li ><a style={{color : "gray", textDecoration : "none"}} href="/blogs/theme1/">테마1</a></li>
                <ul style={{listStyle : "none"}}>
                    <li><a style={{color : "gray", textDecoration : "none"}} href="/blogs/list1">목록1</a></li>
                    <li><a style={{color : "gray", textDecoration : "none"}} href="/blogs/list2">목록2</a></li>
                    <li><a style={{color : "gray", textDecoration : "none"}} href="/blogs/list3">목록3</a></li>
                </ul>
            </ul>
        </div>
      </Menu>
    </Side>
  );
}

export default BlogSidebar;
