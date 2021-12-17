import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"
import { BlockText, PrimaryText } from "../Typography"

const Container = styled(Flex)`
  max-width: 90%;
  width: ${({ autoWidth }) => (autoWidth ? "fit-content" : "455px")};
`

const CardContainer = styled(Flex)`
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 400px;
  box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -webkit-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -moz-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 0.5%);
`

const ContactUsContainer = styled(Box)`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -webkit-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -moz-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 0.5%);
`

const messages = {
  store: {
    tagLine: "Chat and engage directly with customers in your locality",
  },
  customer: {
    tagLine: "Chat and search for products from shops in your locality",
  },
}

const FormLayout = ({ autoWidth, isStore, children }) => {
  const messageKey = isStore ? 'store' : 'customer'
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
            {messages[messageKey].tagLine}
          </PrimaryText>
        </Flex>
      </Box>
      <Box mt={3}>
        <CardContainer py={3} px={3}>
          {children}
        </CardContainer>
      </Box>
      <ContactUsContainer mt={3} p={4}>
        <Flex flexDirection="column">
          <Box>
            <BlockText type="brand">Contact Us</BlockText>
          </Box>
          <Box mt={2}>
            <Flex alignItems="center">
              <Box>
                <PrimaryText inline>Have a question? Whatsapp Us!</PrimaryText>
              </Box>
              <Box ml={2}>
                <a href="https://wa.me/919790946084">
                  <img
                    src="/assets/images/whatsapp.svg"
                    width={20}
                    alt="whatsapp"
                  />
                </a>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </ContactUsContainer>
    </Container>
  )
}

FormLayout.defaultProps = {
  isStore: false
}

export default FormLayout
