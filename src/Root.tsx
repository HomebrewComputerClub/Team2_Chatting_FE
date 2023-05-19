import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import TopBar from "./components/miscellaneous/TopBar";
import Navbar from "./components/molecules/Navbar";
import { userState } from "./Store/atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;
function Root() {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  //로그인 되어있는지 확인
  useEffect(() => {
    if (!userInfo) navigate("/auth");
  }, []);
  return (
    <Wrapper>
      <TopBar />
      <Content>
        <Navbar />
        <Outlet />
      </Content>
    </Wrapper>
  );
}

export default Root;
