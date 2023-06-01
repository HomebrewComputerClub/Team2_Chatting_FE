import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	grid-area: main-view;
	display: flex;
	flex-direction: column;
`;

function HomePage() {
	return (
		<Wrapper>
			<img
				alt='Steve Jobs'
				style={{ width: '500px', alignSelf: 'center' }}
				src={require('./assets/images/Steve.jpeg')}
			/>
			<ul>
				<li>개발이 재미있는 사람들 모임</li>
				<li>개발을 정말 많이 하는 사람들 모임</li>
				<li>컴퓨터 덕후, 또는 덕후가 되고 싶은 사람을 위한 모임</li>
			</ul>
		</Wrapper>
	);
}

export default HomePage;
