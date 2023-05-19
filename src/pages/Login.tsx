import React, { useEffect } from 'react';
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

const dummy = {
	status: 200,
	data: {
		accessToken: '12345',
	},
};

interface FormValues {
	id: string;
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

	const [auth, setAuth] = useRecoilState(authState);

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
		console.log(data);

		const res = dummy;
		/*
		const res = await LogInApi({
			id: data.id,
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
		} else {
			setValue('password', '');
			console.log('실패');
		}
	};
	useEffect(() => {
		console.log(auth);
	}, [auth]);
	return (
		<FullScreen>
			<Container>
				<Title>로그인</Title>
				<form
					style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<Textfield control={control} name='id' setError={setError} />
					<Passwordfield control={control} name='password' setError={setError} />
					<input type='submit' />
				</form>
			</Container>
		</FullScreen>
	);
};

export default Login;
