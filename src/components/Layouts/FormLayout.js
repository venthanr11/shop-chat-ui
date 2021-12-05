import styled from "@emotion/styled"
import React from "react"
import { Flex } from "reflexbox"

const Container = styled(Flex)`
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 90%;
  width: 455px;
  min-height: 400px;
  box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -webkit-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 50%);
  -moz-box-shadow: 0px 0px 12px -4px rgb(60 60 60 / 0.5%);
`

const FormLayout = ({ children }) => {
  return (
    <Container p={3} flexDirection="column">
      {children}
    </Container>
  )
}

export default FormLayout
