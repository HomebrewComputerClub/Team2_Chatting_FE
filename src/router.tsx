import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./pages/chatpage";
import HomePage from "./pages/hompage";
import KakaoAuth from "./pages/kakaoauth";
import Login from "./pages/login";
import ProtectedRoute from "./pages/protectedroute";
import Signup from "./pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "kakao",
        element: <KakaoAuth />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "chats",
            element: <Chatpage />,
          },
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
