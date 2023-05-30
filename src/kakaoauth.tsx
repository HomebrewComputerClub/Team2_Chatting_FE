import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KakaoLogInApi } from "./remote/auth";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code") as string;

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await KakaoLogInApi(code);
      if (res.status === 200) {
        console.log("성공");
        navigate("/login");
      } else {
        console.log("실패");
      }
    })();
  }, []);
  return <p>{code}</p>;
};

export default KakaoAuth;
