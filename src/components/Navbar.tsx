import React from "react";
import styled from "styled-components";
import colors from "../enums/colors";
import Button from "./Shared/Button";
import firebase from "firebase/app";
interface Props {
  userId: string | undefined;
}

const Navbar = ({ userId }: Props) => {
  const signIn = () => {
    if (firebase) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
  };
  return (
    <NavbarWrapper>
      <div>
        <Logo>IMAGE EQUALIZER</Logo>
      </div>
      <div>
        {userId ? (
          <Button text="Log out" buttonColor={colors.red} onClick={signOut} />
        ) : (
          <Button text="Login" buttonColor={colors.yellow} onClick={signIn} />
        )}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  background-color: white;
  padding: 2px 10px;
  border: 3px solid black;

  margin: 0 10px;
`;
