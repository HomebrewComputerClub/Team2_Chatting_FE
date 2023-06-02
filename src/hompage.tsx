import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	grid-area: main-view;
	display: flex;
	flex-direction: column;
`;

const FlexBox = styled.div`
	display: flex;
	gap: 40px;
	margin-block-start: 40px;
	margin-inline-start: 40px;
`;

const H2 = styled.h2`
	font-size: 40px;
`;

const Text = styled.p`
	font-weight: 500;
	line-height: 18px;
	font-size: 16px;
`;

function HomePage() {
	return (
		<Wrapper>
			<img
				alt='Steve Jobs'
				style={{ width: '500px', alignSelf: 'center' }}
				src={require('./assets/images/Steve.jpeg')}
			/>

			<FlexBox>
				<H2>Who?</H2>
				<ul>
					<Text>개발이 재미있는 사람들 모임</Text>
					<Text>개발을 정말 많이 하는 사람들 모임</Text>
					<Text>컴퓨터 덕후, 또는 덕후가 되고 싶은 사람을 위한 모임</Text>
				</ul>
			</FlexBox>
			<FlexBox>
				<H2>When?</H2>
				<ul>
					<Text>매주 금요일 18:00 ~ 22:00 오프라인</Text>
					<Text>매주 월요일 22:00 ~ 23:00 온라인</Text>
				</ul>
			</FlexBox>
			<FlexBox>
				<H2>Where?</H2>
				<ul>
					<Text>안암, 신촌, 한양대 캐치카페</Text>
					<Text>그 외에 서울 지역 카페</Text>
				</ul>
			</FlexBox>
		</Wrapper>
	);
}

export default HomePage;
