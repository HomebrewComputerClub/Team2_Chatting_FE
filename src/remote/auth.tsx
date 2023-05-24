import client from '../utils/network';

export async function LogInApi(data: any) {
	return await client.post('/members/login', data).catch((err) => err?.response);
}

export async function SignUpApi(data: any) {
	return await client.post('/members/signup', data).catch((err) => err?.response);
}
