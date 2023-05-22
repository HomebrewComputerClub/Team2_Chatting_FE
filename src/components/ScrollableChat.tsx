import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useRecoilValue } from "recoil";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChagLogics";
import { userState } from "../Store/atom";

const ScrollableChat = ({ messages }: any) => {
  const userInfo = useRecoilValue(userState);

  return (
    <div style={{ background: "grey" }}>
      {messages &&
        messages.map((m: any, i: any) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, userInfo._id) ||
              isLastMessage(messages, i, userInfo._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === userInfo._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, userInfo._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
