import { GiBeerStein } from "react-icons/gi";
import { GoSearch } from "react-icons/go";

import { AiOutlineSearch } from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import ProfileModal, { ModalOverlay } from "./ProfileModal";
import { getSender } from "../../config/ChagLogics";
import UserListItem from "../userAvatar/UserListItem";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  notificationState,
  selectedChatState,
  userState,
} from "../../Store/atom";
import styled from "styled-components";
import { MdNotifications } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { background, Button } from "@chakra-ui/react";
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
  width: 15vw;
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
  const userInfo = useRecoilValue(userState);
  const [notification, setNotification] = useRecoilState(notificationState);
  const [chats, setChats] = useRecoilState(chatsState);
  const toast = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

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

  const accessChat = async (userId: any) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

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
        <H1>Homebrew</H1>
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
                <h1>sadf</h1>
              ) : (
                searchResult?.map((user: any) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <div>loading</div>}
            </ModalContent>
          </ModalOverlay>
        ) : null}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Menu>
            <MenuButton
              p={1}
              style={{
                background: "none",
                border: "none",
                width: "3vw",
                height: "3vw",
              }}
            >
              <MdNotifications size={32} color="black" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
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
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="black" rightIcon={<ChevronDownIcon />}>
              <img src={userInfo.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={userInfo}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Buttons>
    </Wrapper>
  );
}

export default TopBar;
