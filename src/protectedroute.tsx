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
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from './components/miscellaneous/TopBar';
import Footer from './components/molecules/Footer';
import Navbar from './components/molecules/Navbar';

const Wrapper = styled.div`
	display: grid;
	grid-template-areas:
		'top-bar top-bar'
		'nav-bar main-view'
		'footer footer';
	grid-template-columns: auto 1fr;
	grid-template-rows: 56px 1fr 150px;
	height: 100vh;
`;

const ProtectedRoute = () => {
	return (
		<Wrapper>
			<TopBar />
			<Navbar />
			<Outlet />
			<Footer />
		</Wrapper>
	);
};

export default ProtectedRoute;
