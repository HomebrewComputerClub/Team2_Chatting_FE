import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopBar from "./components/miscellaneous/TopBar";
import Navbar from "./components/molecules/Navbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2000px;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProtectedRoute = () => {
  return (
    <Wrapper>
      <TopBar />
      <Content>
        <Navbar />
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default ProtectedRoute;
