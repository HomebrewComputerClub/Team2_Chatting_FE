import React, { useEffect } from "react";
import { useState } from "react";
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
const ModalContent = styled.div`
  z-index: 20000000;
  background: white;
  width: 40vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Img = styled.img`
  width: 10vw;
  height: 10vw;
  border: 1px solid #111111;
  border-radius: 5px;
`;
const Img1 = styled.img`
  width: 3vw;
  height: 3vw;
  border: 1px solid #eeeeee;
  border-radius: 5px;
`;

const ProfileModal = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOverlayClick = () => {
    setIsOpen(false);
  };
  const onContentClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        style={{ border: "none" }}
      >
        <Img1 src={user.pic} />
      </button>
      {isOpen ? (
        <ModalOverlay onClick={onOverlayClick}>
          <ModalContent onClick={onContentClick}>
            <div>
              <Img src={user.pic} />
            </div>
            <h1>{user.name}</h1>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              close
            </button>
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default ProfileModal;
