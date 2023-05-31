import axios from 'axios';
import client from '../utils/network';

export async function LogInApi(data: any) {
	return await client
		.post(`/api/members/login`, data, { withCredentials: true })
		.catch((err) => err?.response);
}

export async function SignUpApi(data: any) {
	return await client
		.post('/api/members/signup', data, { withCredentials: true })
		.catch((err) => err?.response);
}

// 카카오 소셜 로그인
export async function KakaoLogInApi(data: string) {
	return await client.post('/api/members/kakao', data).catch((err) => err?.response);
}
