import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
// Define the atom to hold the JWT token
//2. sessionStorage에 저장하고 싶은 경우
// //Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
// const sessionStorage =
//   typeof window !== "undefined" ? window.sessionStorage : undefined;

// const { persistAtom } = recoilPersist({
//   key: "userInfo",
//   storage: sessionStorage,
// });

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const userState = atom<any>({
  key: "userState",
  default: null,
  // effects_UNSTABLE: [persistAtom],
});

// Define the atom to hold the login status
export const loggedInAtom = atom({
  key: "loggedInState",
  default: false,
});

export const selectedChatState = atom({
  key: "selectedChatState",
  default: undefined as any,
});

export const notificationState = atom({
  key: "notificationState",
  default: "" as any,
});

export const chatsState = atom({
  key: "chatsState",
  default: undefined as any,
});
