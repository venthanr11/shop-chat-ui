import styled from "@emotion/styled"
import React from "react"

const StyledButton = styled("button")`
  background: #1072db;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  min-width: 120px;
  margin: auto;
`

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>
}

export default Button
