import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import Textfield from '../components/atoms/input/Textfield';
import Passwordfield from '../components/atoms/input/Passwordfield';
import { LogInApi } from '../remote/auth';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import authState from '../recoil/atoms/authState';
import { setCookie } from '../utils/cookie';
import moment from 'moment';
import Emailfield from '../components/atoms/input/Emailfield';
import ModalField from '../components/atoms/ModalField';

const dummy = {
	status: 200,
	data: {
		accessToken: '12345',
	},
};

const label = {
	success: {
		title: '로그인 성공',
		body: '홈페이지로 이동',
		link: '/auth',
	},
	fail: {
		title: '로그인 실패',
		body: '에러 확인',
		link: '/login',
	},
};

interface FormValues {
	email: string;
	password: string;
}
const FullScreen = styled.div`
	display: flex;
	justify-content: center;
`;

const Container = styled.div`
	margin-top: 20px;
	width: 350px;
	height: 650px;
	border: solid 1px rgb(219, 219, 219);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.p`
	font-size: 30px;
	font-weight: 700;
`;
const Login = () => {
	const { handleSubmit, control, setError, getValues, setValue } = useForm<FormValues>();

	// 모달창 관리.
	const [open, setOpen] = useState(false);
	const [error50x, setError50x] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [auth, setAuth] = useRecoilState(authState);

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
		console.log(data);

		const res = dummy;
		/*
		const res = await LogInApi({
			email: data.email,
			password: data.password,
		});
		*/
		if (res.status === 200) {
			// access token 설정.
			setAuth({ status: 'valid', accessToken: res.data.accessToken });
			// 쿠키 설정 -> 이건 나중에 서버가 해줌. 1분뒤에 없어지는 쿠키.
			setCookie('refreshToken', 'abc123', {
				path: '/',
				secure: true,
				sameSite: 'none',
				expires: moment().add('1', 'm').toDate(),
			});

			// API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정.
			// axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
			console.log('성공');
			handleOpen();
		} else {
			setValue('password', '');
			setError50x(true);
			handleOpen();
			console.log('실패');
		}
	};
	useEffect(() => {
		console.log(auth);
	}, [auth]);
	return (
		<FullScreen>
			<ModalField
				open={open}
				handleClose={handleClose}
				label={error50x ? label.fail : label.success}
			/>
			<Container>
				<Title>로그인</Title>
				<form
					style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<Emailfield control={control} name='email' setError={setError} />
					<Passwordfield control={control} name='password' setError={setError} />
					<input type='submit' />
				</form>
			</Container>
		</FullScreen>
	);
};

export default Login;
