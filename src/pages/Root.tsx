import React from 'react';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const Root = () => {
	return (
		<RecoilRoot>
			<CookiesProvider>
				<Outlet />;
			</CookiesProvider>
		</RecoilRoot>
	);
};

export default Root;
