import React, { useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "./Store/atom";
import { LogInApi, SignUpApi } from "./remote/auth";
import ModalField from "./components/molecules/ModalField";
import Emailfield from "./components/molecules/Emailfield";
import Passwordfield from "./components/molecules/Passwordfield";
import Textfield from "./components/molecules/Textfield";
import jwt_decode from "jwt-decode";

export interface FormValues {
  password: string;
  password_confirm: string;
  email: string;
  name: string;
  phone: string;
  univ: string;
  pic: string;
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

const dummy = {
  status: 200,
  data: {
    memberId: 22,
  },
};

const label = {
  success: {
    title: "회원가입 성공",
    body: "홈페이지로 이동",
    link: "/login",
  },
  fail: {
    title: "회원가입 실패",
    body: "에러 확인",
    link: "/register",
  },
};

const Signup = () => {
  // 모달창 관리.
  const [open, setOpen] = useState(false);
  const [error50x, setError50x] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const { handleSubmit, control, setError, getValues, setValue, register } =
    useForm<FormValues>();

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    setPicLoading(true);
    console.log(data);
    // 패스워드 확인.
    if (getValues("password") !== getValues("password_confirm")) {
      setValue("password", "");
      setValue("password_confirm", "");
      setError("password", {
        type: "passwordMismatch",
      });
      setError("password_confirm", {
        type: "passwordMismatch",
        message: "password mismatch",
      });
      setPicLoading(false);
    }
    // 비밀번호는 맞아.
    else {
      console.log("asdfasdfsadf");
      const res = await SignUpApi({
        email: data.email,
        password: data.password,
        name: data.name,
        pic,
      });
      // 회원가입 성공
      if (res?.status === 200) {
        console.log("회원가입 성공");

        setPicLoading(false);
        try {
          const response = await LogInApi({
            email: data.email,
            password: data.password,
          });
          const token = res.headers.authorization;
          setAccessToken(token);

          setUserInfo(jwt_decode(token));
        } catch (err) {
          console.log(err);
        }

        handleOpen();
      } else {
        setError50x(true);
        console.log("회원가입 실패");
        handleOpen();
        console.log(res?.data.memberId);
      }
    }
  };
  const postDetails = (pics: any) => {
    setPicLoading(true);
    if (pics === undefined) {
      console.log("pic == undefined");
      return;
    }
    console.log("pics", pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern-chat");
      data.append("cloud_name", "dql4ynp7j");
      fetch("https://api.cloudinary.com/v1_1/dql4ynp7j/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      console.log("please select another image");
      setPicLoading(false);
      return;
    }
  };
  return (
    <FullScreen>
      <ModalField
        open={open}
        handleClose={handleClose}
        label={error50x ? label.fail : label.success}
      />
      <Container>
        <Title>회원가입</Title>
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
          <Passwordfield
            control={control}
            name="password_confirm"
            setError={setError}
          />
          <Textfield control={control} name="name" setError={setError} />
          <Textfield control={control} name="phone" setError={setError} />
          <Textfield control={control} name="univ" setError={setError} />
          <label>Upload your Picture</label>
          <input value={pic} {...register("pic")} />
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => postDetails(e.target.files[0])}
          />
          <input type="submit" />
        </form>
      </Container>
    </FullScreen>
  );
};

export default Signup;
