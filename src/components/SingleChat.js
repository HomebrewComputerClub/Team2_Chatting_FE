import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import * as SockJS from "sockjs-client";
import { selectedChatState, tokenState, userState } from "../Store/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";
import { Spinner } from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat";
import { getSenderFull } from "../config/ChagLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import styled from "styled-components";
import { RiSendPlane2Fill } from "react-icons/ri";
// import instance from "../../utils/axiosConfig";
const Button = styled.button`
  border: none;
  background: #f5bf19;
  border-radius: 10px;
  width: 3vw;
  height: 3vw;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const userInfo = useRecoilValue(userState);
  const accessToken = useRecoilValue(tokenState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const { apply_id } = useParams();
  const client = useRef({});
  const getChatList = async () => {
    if (!selectedChat) return;
    const data = await axios.get(
      `https://cocobol.site/api/getChatList/${selectedChat.roomId}`,
      {
        headers: {
          Authorization: accessToken,
        },
        withCredentials: true,
      }
    );
    console.log(data.data);
    setChatMessages(data.data);
  };
  const connect = async () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://cocobol.site/api/ws",
      webSocketFactory: () => {
        return new SockJS("https://cocobol.site/api/ws");
      },
      onConnect: async () => {
        console.log("success");
        // await makeRoom();
        // console.log("roomCreated:" + localStorage.getItem("roomId"));
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/direct",
      // headers: { Authorization: "123123123123123" },
      body: JSON.stringify({
        type: "SEND",
        // roomId: localStorage.getItem("roomId"),
        roomId: selectedChat.roomId,
        sender: userInfo.name,
        detail: chat,
        memberId: userInfo.userId,
      }),
    });

    setMessage("");
  };

  const subscribe = () => {
    if (!selectedChat) return;
    // let roomId = localStorage.getItem("roomId");
    client.current.subscribe(`/direct/room/${selectedChat.roomId}`, (body) => {
      if (body.body.type == "SEND") {
        setChatMessages((_chatMessages) => [
          ..._chatMessages,
          JSON.parse(body.body),
        ]);
      }
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    getChatList();
    connect();

    return () => disconnect();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      // setTyping(true);
      // socket.emit("typing", selectedChat._id);
      //publish typing
      setTyping(true);
      client.current.publish({
        destination: "/pub/message/send/direct",
        // headers: { Authorization: "123123123123123" },
        body: JSON.stringify({
          type: "TYPING",
          roomId: selectedChat.roomId,
          sender: userInfo.name,
          detail: chat,
          memberId: userInfo.userId,
        }),
      });
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        // socket.emit("stop typing", selectedChat._id);
        // setTyping(false);
        //publish stop typing
        setTyping(false);
        client.current.publish({
          destination: "/pub/message/send/direct",
          // headers: { Authorization: "123123123123123" },
          body: JSON.stringify({
            type: "STOP",
            // roomId: localStorage.getItem("roomId"),
            roomId: selectedChat.roomId,
            sender: userInfo.name,
            detail: chat,
            memberId: userInfo.userId,
          }),
        });
      }
    }, timerLength);
  };

  console.log("test", chatMessages);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {selectedChat ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setSelectedChat("")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowBackIcon />
            </Button>
            {message &&
              (!selectedChat.isGroupChat ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <ProfileModal
                    user={getSenderFull(userInfo, selectedChat.users)}
                  />
                  {getSender(userInfo, selectedChat.users)} */}
                </div>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={getChatList}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
            <Button>
              <AiOutlineSearch />
            </Button>
          </div>
          <div
            style={{ overflow: "scroll", height: "60vh", background: "white" }}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <ScrollableChat messages={chatMessages} />
            )}
          </div>
          {istyping ? (
            <div>
              <h1>he's typing</h1>
            </div>
          ) : null}
          <div className="search-box" style={{ width: "100%" }}>
            <input
              type={"text"}
              placeholder={"message"}
              value={message}
              onChange={typingHandler}
              onKeyPress={(e) => e.which === 13 && publish(message)}
            />
            <button onClick={() => publish(message)}>
              <RiSendPlane2Fill />
            </button>
          </div>
        </div>
      ) : (
        // to get socket.io on same page
        <div
          style={{
            background: "#F5BF19",
          }}
        >
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </div>
  );
};
export default SingleChat;
