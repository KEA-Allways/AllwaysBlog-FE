import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

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

function ManageSidebar() {
  const menus = [
    { name: "블로그 관리 홈", path: "/mngt" },
    { name: "콘텐츠 관리", path: "/mngt/contents" },
    { name: "서식관리", path: "/mngt/format" },
    { name: "통계", path: "/mngt/setting"}
  ];

  const blogname = "Allways 블로그";
  const blogAddress = "https://dev-sungjun.tistory.com/"
  return (
    <Side>
      <Profile src="/img/usericon.png"></Profile>
      <h4>{blogname}</h4>
      <small>{blogAddress}</small>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{color: "gray", textDecoration: "none"}}
              to={menu.path}
              key={index}
              activeStyle={{color: "black"}}
            >
              <SidebarItem
                menu={menu}
              />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}

export default ManageSidebar;
