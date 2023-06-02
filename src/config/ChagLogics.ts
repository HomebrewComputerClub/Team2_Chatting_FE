export const isSameSenderMargin = (
  messages: any,
  m: any,
  i: any,
  userId: any
) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].memberId === m.memberId &&
    messages[i].memberId !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].memberId !== m.memberId &&
      messages[i].memberId !== userId) ||
    (i === messages.length - 1 && messages[i].memberId !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages: any, m: any, i: any, userId: any) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].memberId !== m.memberId ||
      messages[i + 1].memberId === undefined) &&
    messages[i].memberId !== userId
  );
};

export const isLastMessage = (messages: any, i: any, userId: any) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].memberId !== userId &&
    messages[messages.length - 1].memberId
  );
};

export const isSameUser = (messages: any, m: any, i: any) => {
  return i > 0 && messages[i - 1].memberId === m.memberId;
};

export const getSender = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser.userId ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
