import axios from 'axios';
import { refresh, refreshErrorHandle } from './refresh';

const client = axios.create({
	baseURL: 'https://cocobol.site',
});

client.interceptors.request.use(refresh, refreshErrorHandle);

export default client;
