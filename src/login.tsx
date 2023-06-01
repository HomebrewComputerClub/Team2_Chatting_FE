import React, { useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loggedInAtom, tokenState, userState } from "./Store/atom";
import { LogInApi } from "./remote/auth";
import ModalField from "./components/molecules/ModalField";
import Emailfield from "./components/molecules/Emailfield";
import Passwordfield from "./components/molecules/Passwordfield";
import GoogleLoginButton from "./components/molecules/GoogleLoginButton";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// const dummy = {
//   status: 200,
//   data: {
//     accessToken: "12345",
//   },
// };

const label = {
  success: {
    title: "로그인 성공",
    body: "홈페이지로 이동",
    link: "/",
  },
  fail: {
    title: "로그인 실패",
    body: "에러 확인",
    link: "/login",
  },
};

interface FormValues {
  email: string;
  password: string;
}
const FullScreen = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  width: 350px;
  height: 650px;
  border: solid 1px rgb(219, 219, 219);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SocialLoginButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, getValues, setValue } =
    useForm<FormValues>();

  // 모달창 관리.
  const [open, setOpen] = useState(false);
  const [error50x, setError50x] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInAtom);

  // 카카오 로그인
  const REST_API_KEY = "47430455fb390115140c2fdeb2b46a6b";
  const REDIRECT_URI = "http://localhost:3000/kakao";
  const KAKAO_AUTH_URL = `/oauth2/authorization/kakao`;

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    console.log("login");

    const res = await LogInApi({
      email: data.email,
      password: data.password,
    });
    console.log(res);
    if (res.status === 200) {
      // access token 설정.
      const token = res.headers.authorization;
      setAccessToken(token);
      setUserInfo(jwt_decode(token));
      setIsLoggedIn(true);
      navigate("/");
      // // 쿠키 설정 -> 이건 나중에 서버가 해줌. 1분뒤에 없어지는 쿠키.
      // setCookie("refreshToken", "abc123", {
      //   path: "/",
      //   secure: true,
      //   sameSite: "none",
      //   expires: moment().add("1", "m").toDate(),
      // });

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정.
      // axios.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
      console.log("성공");
      handleOpen();
    } else {
      setValue("password", "");
      setError50x(true);
      handleOpen();
      console.log("실패");
    }
  };

  console.log("decode", userInfo);
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  console.log("userInfo", userInfo);

  //refresh token 있으면 나가

  return (
    <FullScreen>
      <ModalField
        open={open}
        handleClose={handleClose}
        label={error50x ? label.fail : label.success}
      />
      <Container>
        <Title>로그인</Title>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Emailfield control={control} name="email" setError={setError} />
          <Passwordfield
            control={control}
            name="password"
            setError={setError}
          />
          <input type="submit" />
        </form>

        <SocialLoginButton onClick={kakaoLogin}>
          <img
            alt="카카오 소셜 로그인"
            style={{ height: "100%" }}
            src={require("./assets/images/KakaoLogin.png")}
          />
        </SocialLoginButton>
        <GoogleLoginButton />
      </Container>
    </FullScreen>
  );
};

export default Login;
