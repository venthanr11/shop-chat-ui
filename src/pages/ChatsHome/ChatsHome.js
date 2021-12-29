
import styled from '@emotion/styled'
import React from 'react'
import { Box, Flex } from 'reflexbox'
import { EllipsisLoader } from '../../components/Loaders'
import { PrimaryText } from '../../components/Typography'
import { isShopAccount } from '../../utils/utility'
import ShopsChatList from '../ShopsChatList/ShopsChatList'
import CustomerChatList from '../CustomerChatList'

const EmptyImageContainer = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
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

const ChatsHome = () => {

  return (
    isShopAccount() ? <ShopsChatList /> : <CustomerChatList />
  )
}

export default ChatsHome
