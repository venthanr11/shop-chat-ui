import styled from "@emotion/styled"
import React from "react"

const StyledButton = styled("button")`
  position: relative;
  background: ${({ buttonType }) =>
    buttonType === "secondary" ? "#ffffff" : "#8a2be2"};
  padding: 12px 6px;
  border: ${({ buttonType }) =>
    buttonType === "secondary" ? "2px solid #8a2be2" : "2px solid transparent"};
  border-radius: 10px;
  color: ${({ buttonType }) =>
    buttonType === "secondary" ? "#8a2be2" : "#ffffff"};
  font-size: 14px;
  font-weight: 600;
  min-width: 160px;
  margin: auto;
  cursor: pointer;
  letter-spacing: 0.5px;
  ${({ buttonType }) =>
    buttonType === "secondary"
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

const Button = ({ children, onClick, type, htmlType, disabled }) => {
  return (
    <StyledButton
      onClick={onClick}
      buttonType={type}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  htmlType: "button",
}

export default Button
