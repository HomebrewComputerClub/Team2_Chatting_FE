import { Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChagLogics";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSendPlane2Fill } from "react-icons/ri";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  notificationState,
  selectedChatState,
  tokenState,
  userState,
} from "../Store/atom";
import styled from "styled-components";
import * as StompJs from "@stomp/stompjs";
import { BsFillChatHeartFill } from "react-icons/bs";
var selectedChatCompare;
//var socket;

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
  const client = useRef({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const userInfo = useRecoilValue(userState);
  const accessToken = useRecoilState(tokenState);
  const [notification, setNotification] = useRecoilState(notificationState);

  //socket functions: send and fetch messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
      publishJoinedChat(selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // socket.emit("stop typing", selectedChat._id);
      publishStoptyping(selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        // socket.emit("new message", data);
        publish(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  //connect
  const connect = async () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://localhost:8088/api/ws",
      onConnect: async () => {
        console.log("success");
        // await makeRoom();
        // console.log("roomCreated:" + localStorage.getItem("roomId"));
        // socket.on("connected", () => setSocketConnected(true));
        // socket.on("typing", () => setIsTyping(true));
        // socket.on("stop typing", () => setIsTyping(false));
        subscribe();
        subscribeMessage();
      },
    });
    client.current.activate();
  };

  //subscribe
  //subscribe: 1. enter room 2. he is typing 3. he stopped typing
  const subscribe = () => {
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
    client.current.subscribe(`/direct/room/${selectedChat._id}`, (body) => {
      setSocketConnected(true);
    });
    client.current.subscribe(
      `/direct/room/typing/${selectedChat._id}`,
      (body) => {
        setIsTyping(true);
      }
    );
    client.current.subscribe(
      `/direct/room/stoptyping${selectedChat._id}`,
      (body) => {
        setIsTyping(false);
      }
    );
  };

  //subscribe on new message recieved
  const subscribeMessage = () => {
    //   socket.on("message recieved", (newMessageRecieved) => {
    //     if (
    //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
    //       selectedChatCompare._id !== newMessageRecieved.chat._id
    //     ) {
    //       if (!notification.includes(newMessageRecieved)) {
    //         console.log("noti");
    //         setNotification([newMessageRecieved, ...notification]);
    //         setFetchAgain(!fetchAgain);
    //       }
    //     } else {
    //       setMessages([...messages, newMessageRecieved]);
    //     }
    //   });
    client.current.subscribe(
      `/direct/message/${selectedChat._id}`,
      (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notification.includes(newMessageRecieved)) {
            console.log("noti");
            setNotification([newMessageRecieved, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      }
    );
  };

  // publish
  //publish : message sent
  const publish = (chat) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/direct",
      body: JSON.stringify({
        type: "TALK",
        roomId: selectedChat._id,
        sender: "sirong",
        detail: chat,
      }),
    });

    setNewMessage("");
  };

  //publish user info
  const publishUserInfo = (userInfo) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/direct",
      body: JSON.stringify(userInfo),
    });
  };

  //publish I stop typing
  const publishStoptyping = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/stoptyping",
      roomId,
    });
  };

  //publish I started Typing
  const publishTyping = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/typing",
      roomId,
    });
  };

  //push I joined chat
  const publishJoinedChat = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/joinedChat",
      roomId,
    });
  };

  //useEffect
  useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.emit("setup", userInfo);
    publishUserInfo(userInfo);
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
    connect();
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  // useEffect(() => {
  //   //   socket.on("message recieved", (newMessageRecieved) => {
  //   //     if (
  //   //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //   //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //   //     ) {
  //   //       if (!notification.includes(newMessageRecieved)) {
  //   //         console.log("noti");
  //   //         setNotification([newMessageRecieved, ...notification]);
  //   //         setFetchAgain(!fetchAgain);
  //   //       }
  //   //     } else {
  //   //       setMessages([...messages, newMessageRecieved]);
  //   //     }
  //   //   });
  //   subscribeMessage(selectedChat._id);
  // });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      // socket.emit("typing", selectedChat._id);
      publishTyping(selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        // socket.emit("stop typing", selectedChat._id);
        publishTyping(selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

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
            {messages &&
              (!selectedChat.isGroupChat ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ProfileModal
                    user={getSenderFull(userInfo, selectedChat.users)}
                  />
                  {getSender(userInfo, selectedChat.users)}
                </div>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
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
            style={{ overflow: "scroll", height: "70vh", background: "white" }}
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
              <ScrollableChat messages={messages} />
            )}
          </div>
          <form
            onKeyDown={sendMessage}
            id="first-name"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {istyping ? (
              <div>
                <h1>he's typing</h1>
              </div>
            ) : null}
            <div className="search-box" style={{ width: "80%" }}>
              <input
                type="text"
                placeholder="입력..."
                onChange={typingHandler}
              />
              <button>
                <RiSendPlane2Fill />
              </button>
            </div>
          </form>
        </div>
      ) : (
        // to get socket.io on same page
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <BsFillChatHeartFill size={100} />
          <h1
            style={{
              display: "block",
              margin: "30px",
              fontFamily: "Lilita One",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            채팅을 시작해보세요!
          </h1>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
