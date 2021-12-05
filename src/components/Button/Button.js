import styled from "@emotion/styled"
import React from "react"

const StyledButton = styled("button")`
  position: relative;
  background: ${({ type }) => (type === "secondary" ? "#ffffff" : "#a6a676")};
  padding: 12px 16px;
  border: ${({ type }) =>
    type === "secondary" ? "1px solid #1072db" : "none"};
  border-radius: 10px;
  color: ${({ type }) => (type === "secondary" ? "#1072db" : "#ffffff")};
  font-size: 14px;
  font-weight: 600;
  min-width: 160px;
  margin: auto;
  cursor: pointer;
  letter-spacing: 0.5px;
  ${({ type }) =>
    type === "secondary"
      ? ""
      : `
      box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 50%);
      -webkit-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 50%);
      -moz-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 0.5%);
    `};
  outline: none;

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
`

const Button = ({ children, onClick, type, buttonType, disabled }) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      buttonType={buttonType}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

export default Button
