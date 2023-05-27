import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <GlobalStyle />
        <Outlet />
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default App;
