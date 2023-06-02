/*
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from './components/miscellaneous/TopBar';
import Footer from './components/molecules/Footer';
import Navbar from './components/molecules/Navbar';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 1400px;
`;

const Wrapper = styled.div`
	display: grid;
	flex-direction: column;
	justify-content: center;
	height: 1400px;
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	height: 70%;
`;

const ProtectedRoute = () => {
	return (
		<Wrapper>
			<TopBar />
			<Content>
				<Navbar />
				<Outlet />
			</Content>
			<Footer />
		</Wrapper>
	);
};

export default ProtectedRoute;
*/
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopBar from "./components/miscellaneous/TopBar";
import Footer from "./components/molecules/Footer";
import Navbar from "./components/molecules/Navbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProtectedRoute = () => {
  return (
    <Wrapper>
      <TopBar />
      <Navbar />
      <Outlet />
    </Wrapper>
  );
};

export default ProtectedRoute;
