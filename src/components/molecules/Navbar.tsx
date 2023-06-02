import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { RiContactsBook2Fill } from "react-icons/ri";
import { HiDocumentDuplicate } from "react-icons/hi";
import { BsFillChatDotsFill } from "react-icons/bs";
const Wrapper = styled.div`
  grid-area: nav-bar;
  width: 100%;
  height: 100%;
  background: white;
  border-right: 1px solid #ccc;
`;
const Li = styled.li`
  width: 100%;
  display: flex;
  margin: 20px;
`;
const Ul = styled.ul`
  display: block;
  width: 100%;
`;
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 200;
  color: black;
  font-family: "Lilita One", cursive;
  display: block;
  margin-left: 10px;
`;
function Navbar() {
  return (
    <Wrapper>
      <Ul>
        <Li>
          <Link
            to={"/"}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <AiFillHome color={"#f5bf19"} size={32} />
            <H1>Welcome</H1>
          </Link>
        </Li>

        <Li className="menu-item">
          <Link
            to={"/chats"}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <BsFillChatDotsFill color={"#f5bf19"} size={32} />
            <H1>Chatting</H1>
          </Link>
        </Li>
      </Ul>
    </Wrapper>
  );
}

export default Navbar;
