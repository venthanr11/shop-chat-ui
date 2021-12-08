import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"
import { PrimaryText } from "../../components/Typography"
import StoreCard from "./StoreCard"

const StyledContainer = styled(Flex)`
  background: #f8f8f8;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 90%;
  width: 455px;
  box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -webkit-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -moz-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 0.5%);
`

const StoreVerify = () => {
  return (
    <StyledContainer py={3} px={4} flexDirection="column">
      <Flex alignItems="center">
        <Box>
          <img
            src="/assets/images/verified.svg"
            width={32}
            alt="verify your store"
          />
        </Box>
        <Box ml={3}>
          <h2>Verify your shop</h2>
        </Box>
      </Flex>
      <Box my={2}>
        <PrimaryText>
          Update store information to receive direct messages from customers
        </PrimaryText>
      </Box>
      <Box>
        <StoreCard></StoreCard>
      </Box>
    </StyledContainer>
  )
}

export default StoreVerify
