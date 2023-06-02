import axios from 'axios';

export async function LogInApi(data: any) {
	console.log('login');
	return await axios
		.post(`/api/members/login`, data, { withCredentials: true })
		.catch((err) => err?.response);
}

export async function SignUpApi(data: any) {
	console.log('signup data from api', data);
	console.log('signup');
	return await axios.post(`/api/members/signup`, data).catch((err) => err?.response);
}

// 카카오 소셜 로그인
export async function KakaoLogInApi(data: string) {
	return await axios.post('/oauth2/authorization/kakao', data).catch((err) => err?.response);
}
