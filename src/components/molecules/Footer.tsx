import styled from 'styled-components';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const Wrapper = styled.div`
	grid-area: footer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 5%;
	color: rgb(76, 55, 34);
	background-color: rgba(0, 0, 0, 0.035);
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const P = styled.p`
	line-height: 20px;
	font-weight: 500;
`;

const Footer = () => {
	return (
		<Wrapper>
			<Box>
				<h3 style={{ fontSize: '18px', lineHeight: '20px', fontWeight: '700' }}>Contact</h3>
				<br />
				<div style={{ display: 'flex', gap: '10px' }}>
					<MailOutlineIcon />
					<P>Homebrew.official@gmail.com</P>
				</div>
				<div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
					<PhoneIcon />
					<P>회장 손채환 010-1234-5678</P>
				</div>
			</Box>

			<div
				style={{
					width: '1px',
					height: '100px',
					backgroundColor: 'rgb(167, 218, 203)',
					margin: '0px 10px',
				}}
			/>
			<Box>
				<P>회원가입은 매 학기 초마다 지정된 시기에 받고 있습니다</P>
				<P>개발에 관심이 있는 모든 학우분들의 연락을 환영합니다.</P>
				<br />
				<P>가입 문의는 이메일로 연락주시기 바랍니다.</P>
			</Box>
			<div
				style={{
					width: '1px',
					height: '100px',
					backgroundColor: 'rgb(167, 218, 203)',
					margin: '0px 10px',
				}}
			/>
			<Box>
				<a
					style={{ cursor: 'pointer', color: '#47be9b' }}
					href='https://github.com/HomebrewComputerClub'
				>
					GitHub
				</a>
				<P>ⓒ 2023 All Rights Reserved. HomeBrew</P>
			</Box>
		</Wrapper>
	);
};
export default Footer;
