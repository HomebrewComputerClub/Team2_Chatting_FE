import axios from "axios";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { chatsState, tokenState, userState } from "../../Store/atom";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { HiOutlinePlusCircle } from "react-icons/hi";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;
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
  border-radius: 20px;
  z-index: 20000000;
  background: black;
  width: 40vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  padding: 10px;
  width: 80%;
  display: block;
  margin: 10px;
  height: 50px;
  border-radius: 10px;
  border: none;
`;
const Button = styled.button`
  border: none;
  background: #f5bf19;
  border-radius: 10px;
  width: 80%;
  height: 50px;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`;
const GroupChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState<any>("");
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const userInfo = useRecoilValue(userState);
  const [chats, setChats] = useRecoilState(chatsState);

  const handleGroup = (userToAdd: any) => {
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const accessToken = useRecoilState(tokenState);

  const handleSearch = async (query: any) => {
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = (delUser: any) => {
    setSelectedUsers(
      selectedUsers.filter((sel: any) => sel._id !== delUser._id)
    );
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u: any) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      // onClose();
    } catch (error) {}
  };

  const onModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          border: "none",
          background: " #f5bf19",
          borderRadius: "10px",
          width: "3vw",
          height: "3vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HiOutlinePlusCircle size={26} />
      </button>
      {isOpen ? (
        <ModalOverlay onClick={() => setIsOpen(false)}>
          <ModalContent
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <H1>채팅방 만들기</H1>
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="채팅방 이름을 입력해주세요..."
                value={groupChatName}
                onChange={(e: any) => setGroupChatName(e.target.value)}
              />
              <Input
                placeholder="사용자 추가..."
                value={search}
                onChange={(e: any) => {
                  setSearch(e.target.value);
                  handleSearch(search);
                }}
              />
              <div>
                {selectedUsers.map((u: any) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </div>
              {loading ? (
                // <ChatLoading />
                <div>Loading...</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user: any) => (
                    <UserListItem
                      key={userInfo._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </form>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleSubmit}>확인</Button>

              <Button onClick={onModalClose}>닫기</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default GroupChatModal;
