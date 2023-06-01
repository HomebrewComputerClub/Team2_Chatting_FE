import { GiBeerStein } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import jwt_decode from "jwt-decode";

import { AiOutlineSearch } from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import ProfileModal, { ModalOverlay } from "./ProfileModal";
import { getSender } from "../../config/ChagLogics";
import UserListItem from "../userAvatar/UserListItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chatsState,
  loggedInAtom,
  notificationState,
  selectedChatState,
  tokenState,
  userState,
} from "../../Store/atom";
import styled from "styled-components";
import { MdNotifications } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import axios from "axios";

const NotiWrapper = styled.div`
  width: 20vw;
  height: 50vw;
  border-radius: 20px;
  border: none;
  background: #eeee;
  position: absolute;
  top: 1vh;
  left: -11vw;
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 20px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
`;
const ProfiWrapper = styled.div`
  width: 25vw;
  height: 25vw;
  border-radius: 20px;
  border: none;
  background: #eee;
  position: absolute;
  top: 1vh;
  left: -19vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
`;
const Logo = styled.div`
  color: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
  cursor: pointer;
  background-color: inherit;
`;
const H1 = styled.h1`
  color: inherit;
  display: block;
  font-size: 30px;
  font-family: "Lilita One", cursive;
  margin: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: "center";
`;

const ModalContent = styled.div`
  z-index: 20000000;
  border-radius: 40px;
  background: black;
  width: 40vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const Buttons = styled.div`
  border-radius: 10px;
  height: 90%;
  width: 14vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f5bf19;
`;
function TopBar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const setSelectedChat = useSetRecoilState(selectedChatState);
  const [notification, setNotification] = useRecoilState(notificationState);
  const [chats, setChats] = useRecoilState(chatsState);
  const toast = useToast();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInAtom);

  //remain api
  //remain
  const loginRemainApi = async () => {
    try {
      const res = await axios.get(`api/members/tt`, { withCredentials: true });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loginRemainApi();
    // apitest();
  }, []);

  //login method 2.
  //using local storage
  useEffect(() => {
    if (!userInfo) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  const apitest = async () => {
    console.log("asdfasdfads", accessToken);
    try {
      const config = {
        headers: {
          Authorization: `${accessToken}`,
        },
      };
      const res = await axios.get(`/api/members/getUsername`, config);
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = async () => {
    // navigate("/login");
    //logout api 요청해서 refresh token 삭제
    try {
      const { data } = await axios.post(`/api/members/logout`, {});
      setUserInfo(null);
      setAccessToken(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `${accessToken}`,
        },
      };
      console.log("accessToken", accessToken);
      const { data } = await axios.get(`/api/search/${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  console.log("searchResult", searchResult);
  const accessChat = async (userId: any) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      console.log("asdf", accessToken);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
        },
      };
      const { data } = await axios.post(
        `/api/createRoom/${userId}`,
        {},
        config
      );
      console.log("createdRoom", data);

      if (!chats.find((c: any) => c._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setSearchModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  console.log(notification);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const onSearchModalOpen = () => {
    setSearchModalOpen(true);
  };
  const onSearchOverlayClick = () => {
    setSearchModalOpen(false);
  };
  const onSearchContent = (e: any) => {
    e.stopPropagation();
  };

  const onSearchInput = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Wrapper className="topbar">
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        <GiBeerStein size={32} style={{ color: "inherit" }} />
        <H1>Homebrew01</H1>
      </Logo>
      <Buttons>
        <button
          onClick={onSearchModalOpen}
          style={{ background: "none", border: "none" }}
        >
          <AiOutlineSearch size={32} color="black" />
        </button>
        {searchModalOpen ? (
          <ModalOverlay onClick={onSearchOverlayClick}>
            <ModalContent onClick={onSearchContent}>
              <div className="search-box" style={{ width: "80%" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={onSearchInput}
                  value={search}
                />
                <button onClick={handleSearch}>
                  <GoSearch />
                </button>
              </div>
              {loading ? (
                <h1>loading</h1>
              ) : (
                searchResult?.map((user: any) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    handleFunction={() => accessChat(user.id)}
                  />
                ))
              )}
              {loadingChat && <div>loading</div>}
            </ModalContent>
          </ModalOverlay>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "10vw",
            justifyContent: "space-between",
          }}
        >
          <Menu>
            <MenuButton
              style={{
                background: "none",
                border: "none",
                width: "3vw",
                height: "3vw",
              }}
            >
              <MdNotifications size={32} color="black" />
            </MenuButton>
            <MenuList pl={2} color="black">
              <NotiWrapper>
                {!notification?.length && "새로운 메세지가 없습니다"}
                {notification
                  ? notification.map((notif: any) => (
                      <MenuItem
                        key={notif._id}
                        onClick={() => {
                          setSelectedChat(notif.chat);
                          setNotification(
                            notification.filter((n: any) => n !== notif)
                          );
                        }}
                      >
                        {notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${getSender(
                              userInfo,
                              notif.chat.users
                            )}`}
                      </MenuItem>
                    ))
                  : null}
              </NotiWrapper>
            </MenuList>
          </Menu>
          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                bg="white"
                rightIcon={<ChevronDownIcon fontSize={"30px"} />}
                w="6vw"
                h="5vh"
                display={"flex"}
                justifyContent={"center"}
                border={"none"}
                borderRadius={"20px"}
                alignItems={"center"}
                boxShadow={"5px 5px 5px rgba(0, 0, 0, 0.2)"}
              >
                <CgProfile size={30} />
              </MenuButton>
              <MenuList>
                <ProfiWrapper>
                  <ProfileModal user={userInfo}></ProfileModal>
                  <MenuDivider />
                  <MenuItem
                    onClick={logoutHandler}
                    bg={"#f5bf19"}
                    border={"none"}
                    width={"80%"}
                    height={"5vh"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontSize={"28px"}
                    borderRadius={"20px"}
                    boxShadow={`2px 5px 5px rgba(0, 0, 0, 0.2)`}
                  >
                    로그 아웃
                  </MenuItem>
                </ProfiWrapper>
              </MenuList>
            </Menu>
          ) : (
            <Link
              to="/login"
              style={{ position: "absolute", left: "94vw", top: "20" }}
            >
              <GrLogin size={32} color="black" />
            </Link>
          )}
        </div>
      </Buttons>
    </Wrapper>
  );
}

export default TopBar;
