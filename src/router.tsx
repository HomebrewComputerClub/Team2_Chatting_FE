import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./chatpage";
import HomePage from "./hompage";
import KakaoAuth from "./kakaoauth";
import Login from "./login";
import ProtectedRoute from "./protectedroute";
import Signup from "./signup";

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
