import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'recoil-persist',
	storage: sessionStorage,
});

const authState = atom({
	key: 'auth',
	default: {
		status: 'invalid',
		accessToken: '',
	},
	effects_UNSTABLE: [persistAtom],
});

export default authState;
