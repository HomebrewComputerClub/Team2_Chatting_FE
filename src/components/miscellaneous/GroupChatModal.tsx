import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { chatsState, userState } from "../../Store/atom";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const ModalOverlay = styled.div``;
const ModalContent = styled.div``;
const Input = styled.input``;
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

  const handleSearch = async (query: any) => {
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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
          Authorization: `Bearer ${userInfo.token}`,
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
      <button onClick={() => setIsOpen(true)}>new group chat</button>
      {isOpen ? (
        <ModalOverlay>
          <ModalContent>
            <div>Create Group Chat</div>
            <button onClick={onModalClose}>close</button>
            <form>
              <Input
                value={groupChatName}
                onChange={(e: any) => setGroupChatName(e.target.value)}
              />
              <Input
                placeholder="Add Users"
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
              <button onClick={handleSubmit}>Create Chat</button>
            </form>
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default GroupChatModal;
