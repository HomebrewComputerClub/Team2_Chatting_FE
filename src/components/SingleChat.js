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

var selectedChatCompare;

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

  const subscribe = () => {
    let roomId = localStorage.getItem("roomId");
    client.current.subscribe("/direct/room/" + roomId, (body) => {
      console.log("body" + body);
      console.log("body.body" + body.body);
      // const json_body = JSON.parse(body.body);
      // console.log("got msg" + json_body);
      // setChatList((_chat_list) => [..._chat_list, json_body]);
      // socket.on("connected", () => setSocketConnected(true));
      // socket.on("typing", () => setIsTyping(true));
      // socket.on("stop typing", () => setIsTyping(false));
    });
    client.current.subscribe("/direct/room/typing" + roomId, (body) => {
      setIsTyping(true);
    });
    client.current.subscribe("/direct/room/stoptyping" + roomId, (body) => {
      setIsTyping(false);
    });
  };

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
        setSocketConnected(true);
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
      body: JSON.stringify({
        type: "TALK",
        roomId: localStorage.getItem("roomId"),
        sender: "sirong",
        detail: chat,
      }),
    });

    setNewMessage("");
  };

  const publishUserInfo = (userInfo) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/direct",
      body: JSON.stringify(userInfo),
    });
  };
  const publishStoptyping = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/stoptyping",
      roomId,
    });
  };
  const publishTyping = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/message/send/typing",
      roomId,
    });
  };
  const publishJoinedChat = (roomId) => {
    console.log("pub called");
    if (!client.current.connected) return;
    console.log("have connection");
    client.current.publish({
      destination: "/pub/joinedChat",
      roomId,
    });
  };
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
    let roomId = localStorage.getItem("roomId");
    client.current.subscribe(
      "/direct/message/" + roomId,
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
  useEffect(() => {
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
    subscribeMessage();
  });

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

// import { useRef, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import * as StompJs from "@stomp/stompjs";
// import axios from "axios";
// // import instance from "../../utils/axiosConfig";

// const Chat = () => {
//   const [chatList, setChatList] = useState([]);
//   const [chat, setChat] = useState("");

//   //   const { apply_id } = useParams();
//   const client = useRef({});

//   const connect = async () => {
//     client.current = new StompJs.Client({
//       brokerURL: "wss://localhost:8088/api/ws",
//       onConnect: async () => {
//         console.log("success");
//         // await makeRoom();
//         // console.log("roomCreated:" + localStorage.getItem("roomId"));
//         subscribe();
//       },
//     });
//     client.current.activate();
//   };

//   const publish = (chat) => {
//     console.log("pub called");
//     if (!client.current.connected) return;
//     console.log("have connection");
//     client.current.publish({
//       destination: "/pub/message/send/direct",
//       body: JSON.stringify({
//         type: "TALK",
//         roomId: localStorage.getItem("roomId"),
//         sender: "sirong",
//         detail: chat,
//       }),
//     });

//     setChat("");
//   };

//   const subscribe = () => {
//     let roomId = localStorage.getItem("roomId");
//     client.current.subscribe("/direct/room/" + roomId, (body) => {
//       console.log("body" + body);
//       console.log("body.body" + body.body);
//       // const json_body = JSON.parse(body.body);
//       // console.log("got msg" + json_body);
//       // setChatList((_chat_list) => [..._chat_list, json_body]);
//     });
//   };

//   const disconnect = () => {
//     client.current.deactivate();
//   };

//   const handleChange = (event) => {
//     // 채팅 입력 시 state에 값 설정
//     setChat(event.target.value);
//   };

//   const handleSubmit = (event, chat) => {
//     // 보내기 버튼 눌렀을 때 publish
//     event.preventDefault();
//     console.log("handleSubmit called");
//     publish(chat);
//   };

//   useEffect(() => {
//     connect();

//     return () => disconnect();
//   }, []);

//   return (
//     <div>
//       <div className={"chat-list"}>{chatList}</div>
//       <form onSubmit={(event) => handleSubmit(event, chat)}>
//         <div>
//           <input
//             type={"text"}
//             name={"chatInput"}
//             onChange={handleChange}
//             value={chat}
//           />
//         </div>
//         <input type={"submit"} value={"의견 보내기"} />
//       </form>
//     </div>
//   );
// };
// export default Chat;
