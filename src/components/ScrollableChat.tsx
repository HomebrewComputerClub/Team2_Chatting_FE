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
    <ScrollableFeed>
      {messages &&
        messages?.map((m: any, i: any) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, userInfo.userId) ||
              isLastMessage(messages, i, userInfo.userId)) && (
              <h1>{m.senderName}</h1>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.memberId === userInfo.userId ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, userInfo.userId),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.detail}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
