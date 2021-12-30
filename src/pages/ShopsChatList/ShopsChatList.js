import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import { Box, Flex } from "reflexbox"
import { FormLayout } from "../../components/Layouts"
import { EllipsisLoader } from "../../components/Loaders"
import { BlockText, PrimaryText } from "../../components/Typography"
import { postData } from "../../utils/api-helper"
import {
  getShopIdentifier,
  getShopName,
  getShopToken,
  getUtcDateTime,
} from "../../utils/utility"
import dateFormat from "dateformat"
import { useNavigate } from "react-router-dom"

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

const GroupImage = styled("img")`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`

const ChatAvatarContainer = styled(Flex)`
  background: #e3e3e3;
  border-radius: 50%;
  padding: 8px;
  min-width: 36px;
  min-height: 36px;
`

const ChatAvatar = ({size = 40, isMessage = false, avatar}) => {
  const src = avatar || `/assets/images/${isMessage ? 'message' : 'person'}.svg`
  return (
    <ChatAvatarContainer justifyContent="center" alignItems="center">
      <img src={src} width={`${size}px`}/>
    </ChatAvatarContainer>
  )
}

const EmptyState = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" px={3} py={2}>
      <Box textAlign="center">
        <PrimaryText weight={500} inline>
          All customer queries for products from your shop will be
          listed here!
        </PrimaryText>
      </Box>
      <EmptyImageContainer p={4} width={1}>
        <ChatContainer
          mt={2}
          p={2}
          alignItems="center"
          width={1}
        >
          <ChatAvatar />
          <Box ml={3} className="flex-grow">
            <Flex flexDirection="column">
              <Box>
                <BlockText size={12}><EllipsisLoader /></BlockText>
              </Box>
            </Flex>
          </Box>
        </ChatContainer>
      </EmptyImageContainer>
    </Flex>
  )
}

const ChatGroup = ({ chatGroup }) => {
  const navigate = useNavigate()
  const userId = getShopIdentifier()
  return (
    <Flex p={2} flexDirection="column" m={2}>
      <Flex alignItems="center">
        <Box>
          <ChatAvatar size={24} />
        </Box>
        <Box ml={2}>
          <Flex flexDirection="column">
            <Box>
              <BlockText>
                {chatGroup.customer_name} ({chatGroup.resource_chats.length})
              </BlockText>
            </Box>
          </Flex>
        </Box>
      </Flex>
      {chatGroup.resource_chats.map((chat, index) => {
        return (
          <ChatContainer
            key={index}
            mt={2}
            p="12px"
            alignItems="center"
            width={1}
            onClick={() =>
              navigate(`/chat/${chat.conversation_id}/shop/${userId}`)
            }
          >
            <Box>
              <ChatAvatar size={18} isMessage avatar={!!chat.query_images && !!chat.query_images.length && chat.query_images[0] }/>
            </Box>
            <Box ml={2} className="flex-grow" px={2}>
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
              <PrimaryText size={12} nowrap>
                {dateFormat(getUtcDateTime(chat.last_message_at), "hh:MM TT", true)}
              </PrimaryText>
            </Box>
          </ChatContainer>
        )
      })}
    </Flex>
  )
}

const ShopsChatList = () => {
  const [chatGroups, setChatGroups] = useState([])
  const intervalRef = useRef(null)
  const navigate = useNavigate()

  const getChatList = () => {
    const payload = {
      resource_id: getShopToken(),
      offset: 1,
      page_size: 50,
    }
    postData({ url: "/chat/v0/resource_chat_groups", payload })
      .then(({ data }) => setChatGroups(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const intervalId = setInterval(getChatList, 3000)
    intervalRef.current = intervalId
    getChatList()

    return () => {
      clearInterval(intervalRef.current)
    };

  }, [])

  useEffect(() => {
    if (chatGroups.length > 0) {
      // @todo do not stop polling, since we need
      // to update UI with new messages as they come
      // clearInterval(intervalRef.current)
    }
  }, [chatGroups])

  return (
    <FormLayout>
      {!!chatGroups.length ? (
        <Flex flexDirection="column" width={1} p={3}>
          <Box>
            <Flex px={1} alignItems="center">
              <Box className="flex-grow">
                <BlockText>Hello {getShopName()}!</BlockText>
              </Box>
              <Box mt="4px">
                <Flex alignItems="center" style={{cursor: "pointer"}} onClick={() => navigate(`/onboard/${getShopIdentifier()}`)}>
                  <PrimaryText inline size={12} weight="bold">Edit Info</PrimaryText>
                  <Box ml={1}>
                    <img src="/assets/images/edit.svg" width="12px" alt="edit" />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
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

export default ShopsChatList
