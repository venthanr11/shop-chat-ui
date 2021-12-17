
import styled from '@emotion/styled'
import React, {useEffect, useRef, useState} from 'react'
import { Box, Flex } from 'reflexbox'
import { FormLayout } from '../../components/Layouts'
import { EllipsisLoader } from '../../components/Loaders'
import { BlockText, PrimaryText } from '../../components/Typography'
import { postData } from '../../utils/api-helper'
import { getUserToken } from '../../utils/utility'
import dateFormat from "dateformat"
import { useNavigate } from 'react-router-dom'

const EmptyImageContainer = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
`

const ChatGroupsContainer = styled(Box)`
  background: #f9f2f3;
  border-radius: 10px;
`

const ChatContainer = styled(Flex)`
  background: #f1fdf5;
  border-radius: 10px;
  cursor: pointer;
`

const GroupImage = styled('img')`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`

const ChatImage = styled("img")`
  border-radius: 5px;
  width: 40px;
  height: 40px;
`

const EmptyState = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <PrimaryText weight={500} inline>
          Let's take a mindfulness minute, while our friends at the shop get
          back to us
        </PrimaryText>
      </Box>
      <Box mt={2} mb={3}>
        <EllipsisLoader />
      </Box>
      <EmptyImageContainer p={4}>
        <img
          src="/assets/images/mindfulness.svg"
          alt="mindfulness"
          width="160px"
        />
      </EmptyImageContainer>
    </Flex>
  )
}

const ChatGroup = ({chatGroup}) => {
  const navigate = useNavigate();
  return (
    <Flex p={2} flexDirection="column" m={2}>
      <Flex alignItems="center">
        <Box>
          <GroupImage src={chatGroup.query_primary_image_url} />
        </Box>
        <Box ml={3}>
          <Flex flexDirection="column">
            <Box>
              <BlockText>
                {chatGroup.title} ({chatGroup.customer_chats.length})
              </BlockText>
            </Box>
            <Box mt={1}>
              <PrimaryText size={12}>
                {dateFormat(chatGroup.query_posted_time, "hh:MM TT", true)}
              </PrimaryText>
            </Box>
          </Flex>
        </Box>
      </Flex>
      {chatGroup.customer_chats.map((chat) => {
        return (
          <ChatContainer
            mt={2}
            p={2}
            alignItems="center"
            width={1}
            onClick={() => navigate(`/chat/${chat.conversation_id}`)}
          >
            <Box>
              <ChatImage src={chat.resource_image_url} />
            </Box>
            <Box ml={2} className="flex-grow">
              <Flex flexDirection="column">
                <Box>
                  <BlockText size={12}>{chat.last_message_by}</BlockText>
                </Box>
                <Box mt={1}>
                  <PrimaryText size={12}>{chat.last_message}</PrimaryText>
                </Box>
              </Flex>
            </Box>
            <Box>
              <PrimaryText size={12}>
                {dateFormat(chat.last_message_at, "hh:MM TT", true)}
              </PrimaryText>
            </Box>
          </ChatContainer>
        )
      })}
    </Flex>
  )
}

const ChatsHome = () => {
  const [chatGroups, setChatGroups] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    const payload = {
      unique_customer_id: getUserToken(),
      offset: 1,
      page_size: 50,
    }
    const intervalId = setInterval(() => {
      postData({ url: "/chat/v0/customer_chat_groups" }, payload).then(
        ({ data }) => setChatGroups(data)
      ).catch(err => console.log(err))
    },5000)
    intervalRef.current = intervalId
  }, [])

  useEffect(() => {
    if(chatGroups.length > 0) {
      clearInterval(intervalRef.current)
    }
  }, [chatGroups])

  return (
    <FormLayout>
      {!!chatGroups.length ? (
        <Flex flexDirection="column" width={1}>
          <Box>
            <BlockText>Chat Groups ({chatGroups.length})</BlockText>
          </Box>
          {chatGroups.map(chatGroup => {
            return (
              <ChatGroupsContainer m={2}>
                <ChatGroup chatGroup={chatGroup} />
              </ChatGroupsContainer>
            )
          })}
        </Flex>
      ) : (
        <EmptyState />
      )}
    </FormLayout>
  )
}

export default ChatsHome
