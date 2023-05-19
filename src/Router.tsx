import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import LoginHome from './pages/LoginHome';
import ProtectedRoute from './pages/ProtectedRoute';
import Root from './pages/Root';
import Signup from './pages/Signup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: <App />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Signup />,
			},
			{
				path: 'must',
				element: <ProtectedRoute />,
				children: [
					{
						path: 'login',
						element: <LoginHome />,
					},
				],
			},
		],
	},
]);

export default router;
