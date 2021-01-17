import React from "react";
import styled from "styled-components/macro";
import colors from "../../enums/colors";

interface Props {
  buttonColor: colors;
  text: string;
  onClick(): void;
}

const Button = ({ buttonColor, text, onClick }: Props) => {
  return (
    <ButtonWrapper buttonColor={buttonColor} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default Button;

interface IButtonWrapperProps {
  buttonColor: colors;
}

const ButtonWrapper = styled.div<IButtonWrapperProps>`
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  background-color: ${({ buttonColor }) => buttonColor};
  color: ${({ buttonColor }) => {
    if (
      buttonColor === colors.blue ||
      buttonColor === colors.red ||
      buttonColor === colors.green
    ) {
      return "white";
    } else {
      return "black";
    }
  }};
`;
