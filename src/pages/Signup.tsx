import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import Emailfield from '../components/atoms/input/Emailfield';
import Textfield from '../components/atoms/input/Textfield';
import Passwordfield from '../components/atoms/input/Passwordfield';

export interface FormValues {
	id: string;
	password: string;
	password_confirm: string;
	email: string;
	name: string;
	phone: string;
	univ: string;
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
const Signup = () => {
	const { handleSubmit, control, setError, getValues, setValue } = useForm<FormValues>();

	const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
		// 패스워드 확인.
		if (getValues('password') !== getValues('password_confirm')) {
			setValue('password', '');
			setValue('password_confirm', '');
			setError('password', {
				type: 'passwordMismatch',
			});
			setError('password_confirm', {
				type: 'passwordMismatch',
				message: 'password mismatch',
			});
		}
		console.log(data);
	};
	return (
		<FullScreen>
			<Container>
				<Title>회원가입</Title>
				<form
					style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<Textfield control={control} name='id' setError={setError} />
					<Passwordfield control={control} name='password' setError={setError} />
					<Passwordfield control={control} name='password_confirm' setError={setError} />
					<Textfield control={control} name='name' setError={setError} />
					<Emailfield control={control} name='email' setError={setError} />
					<Textfield control={control} name='phone' setError={setError} />
					<Textfield control={control} name='univ' setError={setError} />
					<input type='submit' />
				</form>
			</Container>
		</FullScreen>
	);
};

export default Signup;
