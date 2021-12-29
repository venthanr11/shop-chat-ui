import React, { Fragment, useState } from "react"
import styled from "@emotion/styled"
import { Box, Flex } from "reflexbox"

import ImageUpload from "../../components/ImageUpload/ImageUpload"
import {
  BlockText,
  CalloutText,
  PrimaryText,
} from "../../components/Typography"
import { postData } from "../../utils/api-helper"
import TagLabel from "../../components/TagLabel"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"

const StyledContainer = styled(Flex)`
  width: 100%;
  background: white;
  border-radius: 10px;
  margin: 0 auto;
  padding: 16px 0;
`

const StoreIconContainer = styled(Box)`
  position: relative;
  width: 120px;
  height: 120px;
  background: ${({ url }) => `url("${url}") no-repeat`};
  background-color: #d3d3d3;
  background-size: 100% 180px;
  border-radius: 50%;
`

const StyledCallout = styled(Box)`
  padding: 8px;
  background: #ffffff;
  border: 1px solid #8a2be2;
  border-radius: 6px;
  text-align: center;
`

const StoreInfo = ({ storeInfo, storeCategories }) => {
  const [storeProfileImage, setStoreProfileImage] = useState(storeInfo.imgUrl)
  const navigate = useNavigate()
  return (
    <Fragment>
      <Flex width={1} flexDirection="column" alignItems="center">
        <Box width={1}>
          <Flex
            width={1}
            justifyContent="center"
            style={{ position: "relative" }}
          >
            <StoreIconContainer width={1}>
              <ImageUpload
                isRound
                name="storeProfileImage"
                image={storeProfileImage}
                onLoad={(image, file) => {
                  const formData = new FormData()
                  formData.append("profile_image", file)
                  const config = {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  }
                  postData(
                    {
                      url: `/resource/v0/update_profile_image/${storeInfo.uniqueIdentifier}`,
                      payload: formData,
                    },
                    config
                  )
                    .then(({ data }) => setStoreProfileImage(data.media_url))
                    .catch((err) => console.log(err))
                }}
                isEdit={true}
              />
            </StoreIconContainer>
            <Flex
              alignItems="center"
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <Box mt="3px">
                <img src="/assets/images/phone.svg" alt="phone" width={14} />
              </Box>
              <Box ml={1}>
                <PrimaryText size={12} weight={600}>
                  {storeInfo.formattedPhoneNumber}
                </PrimaryText>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <Box ml={2}>
              <BlockText>Hello {storeInfo.name}!</BlockText>
            </Box>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <Box ml={2}>
              <TagLabel>{storeInfo.department}</TagLabel>
            </Box>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <StyledCallout my={2}>
              <CalloutText>
                Shopchat helps you chat and engage directly with customers
                around you shop. Add product images and start getting messages
                directly from customers in your locality.
              </CalloutText>
            </StyledCallout>
          </Flex>
        </Box>
        <Box mt={3} width={1}>
          <Flex flexDirection="column" width={1}>
            {storeCategories.map((category, index) => (
              <Box
                mb={3}
                key={index}
                onClick={() => {
                  navigate(
                    `/resource/${storeInfo.uniqueIdentifier}/category-images/${category.id}`
                  )
                }}
              >
                <TagLabel type="cta">
                  <Flex alignItems="center" width={1}>
                    <Box>
                      <img
                        src="/assets/images/plus.svg"
                        alt="add"
                        width="12px"
                      />
                    </Box>
                    <Box className="flex-grow text-center" ml={2}>
                      {category.name}
                    </Box>
                    <Box style={{ transform: "rotate(270deg)" }}>
                      <img
                        src="/assets/images/chevron-down.svg"
                        alt="add"
                        width="14px"
                      />
                    </Box>
                  </Flex>
                </TagLabel>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Fragment>
  )
}

const StoreCard = ({ storeInfo }) => {
  const navigate = useNavigate()
  return (
    <Flex flexDirection="column">
      <StyledContainer
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <StoreInfo
          storeInfo={storeInfo.resource}
          storeCategories={storeInfo.categories}
        />
        <Box mt={3}>
          <Button onClick={() => navigate("/chats")}>Done</Button>
        </Box>
      </StyledContainer>
    </Flex>
  )
}

export default StoreCard
