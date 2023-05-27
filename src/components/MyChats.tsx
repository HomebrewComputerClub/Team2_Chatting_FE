import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChagLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatsState, selectedChatState, userState } from "../Store/atom";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;
const Img1 = styled.img`
  width: 3vw;
  height: 3vw;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin: 10px;
`;
const MyChats = ({ fetchAgain }: any) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const userInfo = useRecoilValue(userState);
  const [chats, setChats] = useRecoilState(chatsState);

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(userInfo._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

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
            {chats.map((chat: any) => (
              <div
                onClick={() => setSelectedChat(chat)}
                style={{
                  background: selectedChat === chat ? "#999" : "white",
                  color: selectedChat === chat ? "white" : "black",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  width: "100%",
                  height: "8vh",
                }}
                key={chat._id}
              >
                <Img1
                  src={
                    chat.users[0]._id === userInfo._id
                      ? chat.users[1].pic
                      : chat.users[0].pic
                  }
                />
                <div>
                  <h1>
                    {!chat.isGroupChat
                      ? getSender(userInfo, chat.users)
                      : chat.chatName}
                  </h1>
                  {chat.latestMessage && (
                    <p>
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </p>
                  )}
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
