
import styled from '@emotion/styled'
import React, {useEffect, useRef, useState} from 'react'
import { Box, Flex } from 'reflexbox'
import { FormLayout } from '../../components/Layouts'
import { EllipsisLoader } from '../../components/Loaders'
import { BlockText, PrimaryText } from '../../components/Typography'
import { postData } from '../../utils/api-helper'
import { getCustomerMobile, getUserToken, getUtcDateTime, isShopAccount } from '../../utils/utility'
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
  width: 28px;
  height: 28px;
  margin: 0 4px;
  margin-left: 10px;
`

const ChatImage = styled("img")`
  border-radius: 5px;
  width: 36px;
  height: 36px;
`

const EmptyState = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" px={3} py={2}>
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
  const userId = getUserToken()

  let avatar = !!chatGroup.query_images && !!chatGroup.query_images.length && chatGroup.query_images[0]
  if(!!avatar) {
    avatar = avatar.replace(/\[/g, "").replace(/\]/g, "")
  }
  return (
    <Flex p={2} flexDirection="column" m={2}>
      <Flex alignItems="center">
        <Box>
          <GroupImage src={avatar || `/assets/images/product.svg`} />
        </Box>
        <Box ml={2}>
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
      {chatGroup.customer_chats.map((chat, index) => {
        return (
          <ChatContainer
            key={index}
            mt={2}
            py={2}
            alignItems="center"
            width={1}
            onClick={() => navigate(`/chat/${chat.conversation_id}/customer/${userId}`)}
          >
            <Box mx={2} style={{minWidth: '36px'}}>
              <ChatImage src={chat.resource_image_url} />
            </Box>
            <Box className="flex-grow" pr={2} >
              <Flex flexDirection="column">
                <Box>
                  <BlockText size={12}>{chat.resource_name}</BlockText>
                </Box>
                <Box mt={1}>
                  <PrimaryText size={12}>{chat.last_message}</PrimaryText>
                </Box>
              </Flex>
            </Box>
            <Box pl={2} style={{minWidth: '72px'}}>
              <PrimaryText size={12} nowrap>
                {chat.last_message_at && dateFormat(getUtcDateTime(chat.last_message_at), "hh:MM TT")}
              </PrimaryText>
            </Box>
          </ChatContainer>
        )
      })}
    </Flex>
  )
}

const CustomerChatList = () => {
  const [chatGroups, setChatGroups] = useState([])
  const intervalRef = useRef(null)

  const isShop = isShopAccount()

  const getChatList = () => {
    const payload = {
      unique_customer_id: getUserToken(),
      offset: 1,
      page_size: 50,
    }
    postData({ url: "/chat/v0/customer_chat_groups", payload })
          .then(({ data }) => setChatGroups(data))
          .catch((err) => console.log(err))
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getChatList()
    },3000)
    intervalRef.current = intervalId

    return () => {
      clearInterval(intervalRef.current)
    };
  }, [])

  useEffect(() => {
    if(chatGroups.length > 0) {
      // @todo do not stop polling, since we need
      // to update UI with new messages as they come
      // clearInterval(intervalRef.current)
    }
  }, [chatGroups])

  return (
    <FormLayout>
      {!!chatGroups.length ? (
        <Flex flexDirection="column" width={1} p={3}>
          <Flex px={1} alignItems="center">
            <Box className="flex-grow">
              <BlockText>Chat Groups ({chatGroups.length})</BlockText>
            </Box>
            <Box mt="4px">
              <Flex alignItems="center" style={{cursor: "pointer"}}>
                <Box mr={1}>
                  <img src="/assets/images/phone.svg" width="12px" alt="edit" />
                </Box>
                <PrimaryText inline size={12} weight="bold">{getCustomerMobile()}</PrimaryText>
              </Flex>
            </Box>
          </Flex>
          {chatGroups.map((chatGroup, index) => {
            return (
              <ChatGroupsContainer mt={3} key={index}>
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

export default CustomerChatList
