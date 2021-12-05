import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"

const StyledTagContainer = styled(Flex)`
  background: #e9e9e9;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -webkit-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -moz-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 0.5%);
`

const CloseContainer = styled(Box)`
  cursor: pointer;
`

const Tags = ({ id, text, onClose }) => {
  return (
    <StyledTagContainer alignItems="center">
      <Box>{text}</Box>
      <CloseContainer ml={2} onClick={() => onClose(id)}>
        <img src="/assets/images/close.svg" width={8} alt="clear tag" />
      </CloseContainer>
    </StyledTagContainer>
  )
}

export default Tags
