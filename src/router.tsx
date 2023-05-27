import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";
import Root from "./Root";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/ProtectedRoute";
import LoginHome from "./Pages/LoginHome";
import KakaoAuth from "./Pages/KakaoAuth";
import Signup from "./Pages/Signup";

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
