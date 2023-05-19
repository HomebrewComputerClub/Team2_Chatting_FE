import client from '../utils/network';

export async function LogInApi(data: any) {
	return await client.post('/login', data).catch((err) => err?.response);
}

export async function SignUpApi(data: any) {
	return await client.post('/register', data).catch((err) => err?.response);
}
