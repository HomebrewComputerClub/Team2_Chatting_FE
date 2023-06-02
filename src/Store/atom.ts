import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
// Define the atom to hold the JWT token
//2. sessionStorage에 저장하고 싶은 경우
// //Next.js를 쓴다면 sessionStorage는 아래와 같이 따로 설정 필요
// const sessionStorage =
//   typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom: persistAtom1 } = recoilPersist({
  key: "userInfo",
  storage: localStorage,
});

const { persistAtom: persistAtom2 } = recoilPersist({
  key: "accessToken",
  storage: localStorage,
});

//Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
export const userState = atom<any>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom1],
});

export const tokenState = atom<any>({
  key: "tokenState",
  default: null,
  effects_UNSTABLE: [persistAtom2],
});

// Define the atom to hold the login status
export const loggedInAtom = atom({
  key: "loggedInState",
  default: false,
});

export const selectedChatState = atom({
  key: "selectedChatState",
  default: null as any,
});

export const notificationState = atom({
  key: "notificationState",
  default: null as any,
});

export const chatsState = atom({
  key: "chatsState",
  default: null as any,
});
