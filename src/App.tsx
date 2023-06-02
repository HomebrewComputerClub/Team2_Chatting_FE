import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles';
import { RecoilRoot } from 'recoil';
function App() {
	return (
		<RecoilRoot>
			<GlobalStyle />
			<Outlet />
		</RecoilRoot>
	);
}

export default App;
