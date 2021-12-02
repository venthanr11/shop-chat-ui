import styled from "@emotion/styled"
import React, { Fragment, useState } from "react"
import { Box, Flex } from "reflexbox"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import Input from "../../components/Input"
import {
  BlockText,
  PrimaryText,
  SectionHeading,
  CalloutText,
} from "../../components/Typography"

const StyledContainer = styled(Flex)`
  background: rgb(241, 241, 241);
  border-radius: 10px;
  margin: 20px auto;
  padding: 16px;
  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 30%);
  -webkit-box-shadow: 0px 0px 8px -3px rgb(0 0 0 / 30%);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
`

const StoreIconContainer = styled(Box)`
  width: calc(100% + 32px);
  margin: -16px;
  img {
    border-radius: 10px 10px 0 0;
    cursor: pointer;
    height: 180px;
  }
`

const StyledCallout = styled(Box)`
  padding: 8px;
  background: #ffffff;
  border: 1px solid #ff3b3b;
  border-radius: 10px;
`

const StoreInfo = () => {
  return (
    <Fragment>
      <Flex width={1} flexDirection="column">
        <StoreIconContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Lifestyle_Stores_-_New.jpg/1200px-Lifestyle_Stores_-_New.jpg"
            width="100%"
            alt="store name"
          />
        </StoreIconContainer>
        <Box mt={4}>
          <Flex>
            <Box>
              <img src="/assets/images/store.svg" width={24} alt="lifestyle" />
            </Box>
            <Box ml="10px">
              <BlockText>Lifestyle</BlockText>
            </Box>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <Box>
              <img
                src="/assets/images/address.svg"
                width={24}
                alt="lifestyle"
              />
            </Box>
            <Box ml="24px">
              <PrimaryText>
                No.G-48, Ground Floor,142, Phoenix Market City, Velachery Rd,
                Indira Gandh Nagar, Velachery, Chennai, Tamil Nadu 600042, India
              </PrimaryText>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Fragment>
  )
}

const StoreContactInfo = () => {
  return (
    <Flex flexDirection="column">
      <Box>
        <Flex alignItems="center">
          <img
            src="/assets/images/contact-book.svg"
            width={26}
            alt="contact information"
          />
          <Box ml={2}>
            <SectionHeading>Contact Information</SectionHeading>
          </Box>
        </Flex>
      </Box>
      <Box mt={3}>
        <PrimaryText>
          This will be your shop's primary contact for customers. The mobile
          number entered here will be enabled to chat with customers & update
          shop data.
        </PrimaryText>
      </Box>
      <StyledCallout mt={3}>
        <CalloutText>
          It is important to update this accurately. Please ensure this is
          Whatsapp enabled to receive rich notifications from customers.
        </CalloutText>
      </StyledCallout>
      <Box mt={4}>
        <Input
          name="primary_contact_name"
          placeholder="Primary Contact Name"
          label="Primary Contact Name"
        />
      </Box>
      <Box mt={3}>
        <Dropdown
          name="primary_contact_designation"
          placeholder="Designation"
          label="Designation"
          items={[]}
        />
      </Box>
      <Box mt={3}>
        <Input
          name="primary_contact_mobile"
          placeholder="Mobile Number"
          label="Mobile Number"
        />
      </Box>
    </Flex>
  )
}

const StoreProductInfo = () => {
  return (
    <Flex flexDirection="column">
      <Box>
        <Flex alignItems="center">
          <img
            src="/assets/images/product-category.svg"
            width={26}
            alt="product categories"
          />
          <Box ml={2}>
            <SectionHeading>Product Categories</SectionHeading>
          </Box>
        </Flex>
      </Box>
      <Box mt={3}>
        <PrimaryText>
          Please select detailed product categories of product you hold in your
          shop. You can select multiple categories. Please select carefully and
          accurately.
        </PrimaryText>
      </Box>
      <Box mt={3}>
        <Dropdown
          name="department"
          placeholder="Department"
          label="Department"
          items={[]}
        />
      </Box>
      <Box mt={3}>
        <Dropdown
          name="category"
          placeholder="Category"
          label="Category"
          items={[]}
        />
      </Box>
      <Box mt={3}>
        <Dropdown
          name="product_catergories"
          placeholder="Product Categories"
          label="Product Categories"
          items={[]}
        />
      </Box>
    </Flex>
  )
}

const StoreCard = () => {
  const [wizardState, setWizardState] = useState(0)
  return (
    <Flex flexDirection="column">
      <StyledContainer flexDirection="column">
        {wizardState === 0 ? (
          <StoreInfo />
        ) : wizardState === 1 ? (
          <StoreContactInfo />
        ) : (
          <StoreProductInfo />
        )}
      </StyledContainer>
      <Flex justifyContent="center">
        {wizardState > 0 ? (
          <Box mx={2}>
            <Button
              type="secondary"
              onClick={() => {
                setWizardState((wizardState) => --wizardState)
              }}
            >
              Previous
            </Button>
          </Box>
        ) : null}
        {wizardState <= 1 ? (
          <Box mx={2}>
            <Button
              onClick={() => {
                setWizardState((wizardState) => ++wizardState)
              }}
            >
              Next
            </Button>
          </Box>
        ) : (
          <Box mx={2}>
            <Button
              onClick={() => {
                setWizardState((wizardState) => ++wizardState)
              }}
            >
              Complete Verification
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default StoreCard
