import React, { useState } from "react";
import styled from "styled-components/macro";

import "./App.css";
import Authenticated from "./components/Authenticated";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import colors from "./enums/colors";

import firebase from "./firebase";

function App(): JSX.Element {
  const [userId, setUserId] = useState<string | undefined>("");
  firebase.auth().onAuthStateChanged((user) => {
    setUserId(user?.uid);
  });
  return (
    <AppWrapper className="App">
      <Navbar userId={userId} />
      {userId ? <Authenticated /> : <Login />}
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  background-color: ${colors.brown};
  height: 100vh;
  width: 100vw;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-family: "IBM Plex Mono", monospace;
`;
