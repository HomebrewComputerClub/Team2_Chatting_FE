import React from "react";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1999999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 12vw;
  height: 12vw;
  border-radius: 5px;
`;
const H1 = styled.h1`
  font-size: 25px;
  color: #111;
  font-family: "Lilita One", cursive;
`;
const ProfileModal = ({ user }: any) => {
  return (
    <>
      <div>
        <Img src={user?.pic} />
      </div>
      <H1>{user?.name}</H1>
    </>
  );
};

export default ProfileModal;
