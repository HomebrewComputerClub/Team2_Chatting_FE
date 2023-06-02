import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chatsState,
  selectedChatState,
  tokenState,
  userState,
} from "../Store/atom";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;
const Img1 = styled.img`
  width: 5vw;
  height: 5vw;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin: 10px;
  display: block;
`;
const MyChats = ({ fetchAgain }: any) => {
  const userInfo = useRecoilValue(userState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [chats, setChats] = useRecoilState(chatsState);

  const fetchChats = async () => {
    // console.log(userInfo._id);
    try {
      console.log("accesstk", accessToken);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
        },
      };

      const { data } = await axios.get("/api/getRoomList/direct", config);
      // const data = [
      //   {
      //     roomId: "fakeroomId",
      //     targetImage:
      //       "https://res.cloudinary.com/dql4ynp7j/image/upload/v1683891387/mtkc8k2miuzbawzquxt5.jpg",
      //     targetName: "손병우",
      //     lastContent: "asdfa;sldfjkal;sdjflkasdjflk;asjdf;lkjasds",
      //   },
      // ];
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("chats", chats);

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")!));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "35vw",
        marginTop: "5vh",
        border: "1px solid #ffff",
        borderRadius: "20px",
        background: "white",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
          width: "95%",
        }}
      >
        <H1 style={{ color: "black" }}>채팅</H1>
        <GroupChatModal />
      </div>
      <div style={{ height: "80%", width: "100%" }}>
        {chats ? (
          <div style={{ overflowY: "scroll", height: "100%", width: "100%" }}>
            {chats?.map((chat: any, index: number) => (
              <div
                onClick={() => setSelectedChat(chat)}
                style={{
                  background: selectedChat === chat ? "#999" : "white",
                  color: selectedChat === chat ? "white" : "black",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  width: "100%",
                  height: "7vh",
                }}
                key={index}
              >
                <Img1 src={chat.targetImage} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <h1
                    style={{
                      display: "block",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {chat.targetName}
                  </h1>
                  <div
                    style={{
                      marginTop: "5px",
                      overflow: "hidden",
                      width: "90%",
                    }}
                  >
                    {chat.lastContent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
