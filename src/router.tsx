import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./Pages/ChatPage";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
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