import styled from "@emotion/styled"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Flex, Box } from "reflexbox"
import { BlockText, PrimaryText } from "../Typography"

const ShopchatHeader = styled(Flex)`
  background: #ffffff;
  -webkit-box-shadow: 3px 3px 9px -8px rgb(0 0 0 / 50%);
  -moz-box-shadow: 3px 3px 9px -8px rgba(0, 0, 0, 0.5);
  box-shadow: 3px 3px 9px -8px rgb(0 0 0 / 50%);
  cursor: pointer;
`

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

const messages = {
  store: {
    tagLine: "Chat and engage directly with customers in your locality",
  },
  customer: {
    tagLine: "Chat and search for products from shops in your locality",
  },
}

const FormLayout = ({ autoWidth, isStore, children }) => {
  const navigate = useNavigate()
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Box>
        <ShopchatHeader alignItems="center" px={3} py={2} onClick={() => navigate("/")}>
          <Box>
            <img
              src="/assets/images/shopchat-logo.png"
              alt="shopchat"
              width="40px"
            />
          </Box>
          <Box ml={2}>
            <PrimaryText size={22} weight={600} type="brand">
              Shopchat
            </PrimaryText>
          </Box>
        </ShopchatHeader>
      </Box>
      <Container
        my={3}
        autoWidth={autoWidth}
        mx="auto"
        flexDirection="column"
        justifyContent="center"
      >
        <CardContainer py={3} flexDirection="column">
          {children}
          <Flex flexDirection="column">
            <Box mt={2}>
              <Flex alignItems="center" justifyContent="center">
                <Box>
                  <BlockText inline size={12}>
                    Have a question? Whatsapp Us!
                  </BlockText>
                </Box>
                <Box ml={2}>
                  <a
                    href="https://wa.me/919790946084"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/assets/images/whatsapp.svg"
                      width={18}
                      alt="whatsapp"
                    />
                  </a>
                </Box>
              </Flex>
            </Box>
            <Box className="text-center" mt={2}>
              <PrimaryText size={12} weight={600}>
                © 2021 Shopchat Technologies Private Limited
              </PrimaryText>
              <PrimaryText size={12}>
                Incorporation details - Corporate identity of the company is
                U72900TN2021PTC148101 dated 23 Nov 2021
              </PrimaryText>
            </Box>
          </Flex>
        </CardContainer>
      </Container>
    </Flex>
  )
}

FormLayout.defaultProps = {
  isStore: false,
}

export default FormLayout
