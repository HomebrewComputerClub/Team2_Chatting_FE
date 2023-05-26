import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';
import { useRecoilState } from 'recoil';
import authState from '../recoil/atoms/authState';
import { getCookie, removeCookie } from './cookie';

const dummy = {
	status: 200,
	data: {
		accessToken: '12345',
	},
};

interface DecodedToken {
	exp: number;
}

interface DecodedRefreshToken {
	exp: number;
}

const Refresh = async (
	config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
	// 쿠키에 있는 리프레시 토큰 받아옴.
	const refreshToken = getCookie('refreshToken');
	// recoil에 있는 어세스 토큰 받아옴.
	const [auth, setAuth] = useRecoilState(authState);

	// 어세스 토큰 있으면.
	if (auth.accessToken) {
		// 복호화.
		const decodedToken: DecodedToken = jwt_decode(auth.accessToken);
		// accessToken 유효기간 지났으면.
		if (Date.now() >= decodedToken.exp * 1000) {
			console.log('refresh');
			const decodedRefreshToken: DecodedRefreshToken = jwt_decode(refreshToken);
			// refreshToken 유효기간 지났으면.
			if (Date.now() >= decodedRefreshToken.exp * 1000) {
				console.log('logout');
				setAuth({
					status: 'invalid',
					accessToken: '',
				});
			}
			// refreshToken 유효기간 안지났으면.
			else {
				// 서버에 갱신요청.
				// const res = await axios.post();
				const res = dummy;
				if (res.status === 200) {
					setAuth({
						status: 'valid',
						accessToken: res.data.accessToken,
					});

					config.headers.set('Authorization', `Bearer ${res.data.accessToken}`);
					/*
					config.headers = {
						Authorization: `Bearer ${res.data.accessToken}`,
					};
					*/
					//config.headers?.Authorization = `Bearer ${res.data.accessToken}`;
				}
				// 정상 처리 안되었으면 로그아웃.
				else {
					console.log('logout');
					setAuth({
						status: 'invalid',
						accessToken: '',
					});
				}
			}
		}
		// accessToken 유효기간 안지났으면.
		else {
			config.headers.set('Authorization', `Bearer ${auth.accessToken}`);
		}
	}

	return config;
};

const refreshErrorHandle = (error: any) => {
	removeCookie('refreshToken');
	return Promise.reject(error);
};

export { Refresh, refreshErrorHandle };
