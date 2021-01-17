import React from "react";
import styled from "styled-components";
import Collage from "../assets/images/collage.png";

const Login = () => {
  return (
    <LoginWrapper>
      <Title>
        Lets make all your images <br /> the same aspect ratio.
      </Title>
      <StyledImage src={Collage} alt="" />
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 50px;
`;

const StyledImage = styled.img`
  max-width: 75vw;
  max-height: 60vh;
`;
