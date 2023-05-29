import { useEffect, useState } from "react";
import Chatbox from "./components/Chatbox";
import MyChats from "./components/MyChats";
import { useRecoilValue } from "recoil";
import { userState } from "./Store/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  background: #f5bf19;
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
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  //로그인 되어있는지 확인
  // useEffect(() => {
  //   if (!userInfo) navigate("/login");
  // }, []);

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
