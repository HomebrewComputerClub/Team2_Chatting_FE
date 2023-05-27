import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./pages/chatpage";
import HomePage from "./pages/hompage";
import KakaoAuth from "./pages/kakaoauth";
import Login from "./pages/login";
import LoginHome from "./pages/loginhome";
import ProtectedRoute from "./pages/protectedroute";
import Signup from "./pages/signup";
import Root from "./Root";

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
        path: "must",
        element: <ProtectedRoute />,
        children: [
          {
            path: "login",
            element: <LoginHome />,
          },
        ],
      },
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "chats",
            element: <Chatpage />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
