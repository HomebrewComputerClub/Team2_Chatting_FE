import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../recoil/atoms/authState';

const ProtectedRoute = () => {
	const [auth, setAuth] = useRecoilState(authState);

	// 로그인 상태가 아니라면.
	if (auth?.status !== 'valid') {
		return <Navigate to='/login' />;
	}
	// 로그인 상태면.
	return <Outlet />;
};

export default ProtectedRoute;
