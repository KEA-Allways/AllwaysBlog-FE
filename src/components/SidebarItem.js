import React from "react";
import styled from "styled-components";

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// const MenuIcon = styled.img`
//   width: 24px;
//   height: 24px;
//   margin-right: 10px;
// `;

const MenuText = styled.span`
  font-size: 16px;
`;

function SidebarItem({ menu }) {
  return (
    <MenuItem>
      {/* {menu.icon && <MenuIcon src={menu.icon} alt={menu.name} />} */}
      <MenuText>{menu.name}</MenuText>
    </MenuItem>
  );
}

export default SidebarItem;
