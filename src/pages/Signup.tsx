import React, { useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import Emailfield from "../components/atoms/input/Emailfield";
import Textfield from "../components/atoms/input/Textfield";
import Passwordfield from "../components/atoms/input/Passwordfield";
import { SignUpApi } from "../remote/auth";
import ModalField from "../components/atoms/ModalField";
import { useNavigate } from "react-router-dom";

export interface FormValues {
  password: string;
  password_confirm: string;
  email: string;
  name: string;
  phone: string;
  univ: string;
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

  const { handleSubmit, control, setError, getValues, setValue } =
    useForm<FormValues>();

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
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
    }
    // 비밀번호는 맞아.
    else {
      /*
			const res = await SignUpApi({
				email: data.email,
				password: data.password,
				name: data.name,
			});
			*/
      const res = dummy;
      // 회원가입 성공
      if (res.status === 200) {
        console.log("회원가입 성공");
        handleOpen();
      } else {
        setError50x(true);
        console.log("회원가입 실패");
        handleOpen();
        console.log(res.data.memberId);
      }
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
          <input type="submit" />
        </form>
      </Container>
    </FullScreen>
  );
};

export default Signup;
