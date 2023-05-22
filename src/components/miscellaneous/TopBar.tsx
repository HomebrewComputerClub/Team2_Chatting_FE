import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

import { GoSearch } from "react-icons/go";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

const Wrapper = styled.div`
  width: 100vw;
  height: 7vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background: black;
  color: white;
  display: flex;
  justify-content: space-around;
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth");
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
      onClose();
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
    <Wrapper>
      <button onClick={onSearchModalOpen}>사람 검색</button>
      {searchModalOpen ? (
        <ModalOverlay onClick={onSearchOverlayClick}>
          <ModalContent onClick={onSearchContent}>
            <h1>Search Users</h1>
            <div>
              <div>
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
              </div>
              {loading ? (
                <ChatLoading />
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
            </div>
          </ModalContent>
        </ModalOverlay>
      ) : null}
      <h1>Homebrew</h1>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1} />
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
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={userInfo.name}
              src={userInfo.pic}
            />
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
    </Wrapper>
  );
}

export default TopBar;
