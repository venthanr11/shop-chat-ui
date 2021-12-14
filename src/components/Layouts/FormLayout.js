import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"
import { PrimaryText } from "../Typography"

const Container = styled(Flex)`
  max-width: 90%;
  width: ${({ autoWidth }) => (autoWidth ? "auto" : "455px")};
`

const CardContainer = styled(Flex)`
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 400px;
  box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -webkit-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -moz-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 0.5%);
`

const FormLayout = ({ autoWidth, children }) => {
  return (
    <Container
      autoWidth={autoWidth}
      mx="auto"
      my={4}
      flexDirection="column"
      justifyContent="center"
    >
      <Box>
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <img src="/assets/images/shopchat-logo.png" />
          </Box>
          <Box ml={2}>
            <PrimaryText size={22} weight={600} type="brand">
              Shopchat
            </PrimaryText>
          </Box>
        </Flex>
        <Flex mt={3} mb={2} justifyContent="center">
          <PrimaryText size={16} weight={500}>
            Chat and engage directly with customers in your locality
          </PrimaryText>
        </Flex>
      </Box>
      <Box mt={3}>
        <CardContainer py={3} px={4}>
          {children}
        </CardContainer>
      </Box>
    </Container>
  )
}

export default FormLayout
