import { useEffect, useState } from "react";
import Chatbox from "./components/Chatbox";
import MyChats from "./components/MyChats";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInAtom, tokenState, userState } from "./Store/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  background: #f5bf19;
  grid-area: main-view;
`;
const ChatBoxWrapper = styled.div`
  background: inherit;
  position: fixed;
  top: 7vh;
  left: 15vw;
  display: flex;
  justify-content: space-around;
  height: 93vh;
  width: 85vw;
`;
const Chatpage = () => {
  const userInfo = useRecoilValue(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInAtom);
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      setIsLoggedIn(false);
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
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
