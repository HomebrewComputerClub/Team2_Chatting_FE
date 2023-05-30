import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
	const onSuccess = (res: any) => {
		console.log(res);
	};

	return (
		<GoogleOAuthProvider clientId='710638634802-f7hr7encou0hr86a806o57epc7ql0rap.apps.googleusercontent.com'>
			<GoogleLogin onSuccess={onSuccess} onError={() => console.log('Login Failed')} />
		</GoogleOAuthProvider>
	);
};

export default GoogleLoginButton;
