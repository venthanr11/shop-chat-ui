import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"
import { PrimaryText } from "../../components/Typography"

const InfoContainer = styled(Box)`
  width: 455px;
  max-width: 90%;
  margin: 0 auto;
`

const QuestionContainer = styled(Box)`
  padding-bottom: 12px;
`

const AnswerContainer = styled(Box)`
  &:before {
    content: "• ";
    margin-right: 4px;
  }
`

export default function ShopchatInfo() {
  return (
    <InfoContainer mt={2} p={3}>
      <QuestionContainer>
        <Box>
          <PrimaryText size={16} weight={600} type="brand">
            What is shopchat?
          </PrimaryText>
        </Box>
        <AnswerContainer mt={2}>
          <PrimaryText size={13} inline weight={500}>
            Shopchat is a product search & chat app built for customers to chat
            and discover products from shops in their locality. As a shop, you
            can now respond directly to customer product queries, chat and
            engage with them easily.
          </PrimaryText>
        </AnswerContainer>
      </QuestionContainer>
      <QuestionContainer mt={3}>
        <Box>
          <PrimaryText size={16} weight={600} type="brand">
            Shopchat works in simple ways
          </PrimaryText>
        </Box>
        <AnswerContainer mt={2}>
          <PrimaryText size={13} inline weight={500}>
            Customers in your shop’s locality post their product query on
            Shopchat
          </PrimaryText>
        </AnswerContainer>
        <AnswerContainer mt={2}>
          <PrimaryText size={13} inline weight={500}>
            Shopchat sends you the query on WhatsApp or SMS along with a link to
            directly chat with customers
          </PrimaryText>
        </AnswerContainer>
        <AnswerContainer mt={2}>
          <PrimaryText size={13} inline weight={500}>
            You can then easily chat with multiple customers at the same time,
            generate more sales leads and increase your shops visibility in your
            locality
          </PrimaryText>
        </AnswerContainer>
      </QuestionContainer>
      <QuestionContainer mt={3}>
        <Box>
          <PrimaryText size={16} weight={600} type="brand">
            What’s next?
          </PrimaryText>
        </Box>
        <AnswerContainer mt={2}>
          <PrimaryText size={13} inline weight={500}>
            Update your profile & verify your shop to get started
          </PrimaryText>
        </AnswerContainer>
      </QuestionContainer>
    </InfoContainer>
  )
}
