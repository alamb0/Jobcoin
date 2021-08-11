import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.nav`
  display: flex;
  border: solid 1px;
  height: 2em;
`;

const NavbarInfo = styled.div`
  display: flex;
`;

const NavbarUser = styled.div`
  display: flex;
  margin-left: auto;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  border: solid grey;
  border-radius: 50%;
  margin: auto;
`;

const Item = styled.div`
  margin: auto;
  white-space: nowrap;
`;

const UserIcon = styled.div`
  width: 25px;
  height: 25px;
  border: solid grey;
  margin: auto;
`;

export default function Navbar() {
  return (
    <NavbarWrapper>
      <NavbarInfo>
        <Icon />
        <Item>Jobcoin Sender</Item>
      </NavbarInfo>
      <NavbarUser>
        <UserIcon />
        <Item>Signed In</Item>
        <Item>
          <Link to="/">Sign Out</Link>
        </Item>
      </NavbarUser>
    </NavbarWrapper>
  );
}
