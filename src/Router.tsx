import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
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
		],
	},
]);

export default router;
