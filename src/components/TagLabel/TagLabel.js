import styled from "@emotion/styled"
import React from "react"
import { Flex } from "reflexbox"

const StyledTagContainer = styled(Flex)`
  background: ${({ type }) => (type === "cta" ? "#f1edf5" : "#e8d1ff")};
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  cursor: ${({ type }) => (type === "cta" ? "pointer" : "inherit")};
  box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -webkit-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -moz-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 0.5%);
`

const TagLabel = ({type, children}) => {
  return (
    <StyledTagContainer type={type} alignItems="center">
      {children}
    </StyledTagContainer>
  )
}

export default TagLabel
