import React from "react";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import TopBar from "../components/miscellaneous/TopBar";
import { useRecoilValue } from "recoil";
import { userState } from "../Store/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div``;
const ChatBoxWrapper = styled.div`
  position: fixed;
  top: 15vh;
  left: 25vw;
  display: flex;
  justify-content: space-around;
  background: pink;
  height: 80vh;
  width: 65vw;
  border: 0.5px solid #111;
`;
const Chatpage = () => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  //로그인 되어있는지 확인
  useEffect(() => {
    if (!userInfo) navigate("/auth");
  }, []);

  return (
    <Wrapper>
      <ChatBoxWrapper>
        <MyChats fetchAgain={fetchAgain} />
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </ChatBoxWrapper>
    </Wrapper>
  );
};

export default Chatpage;
