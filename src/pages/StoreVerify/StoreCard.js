import styled from "@emotion/styled"
import React, { Fragment } from "react"
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
`

const StoreIconContainer = styled(Box)`
  img {
    border-radius: 50%;
    cursor: pointer;
  }
`

const StyledCallout = styled(Box)`
  padding: 8px;
  background: #ffffff;
  border: 1px solid #ff3b3b;
  border-radius: 10px;
`

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
      <Box mt={4} mx="auto">
        <Button>Update</Button>
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
      <Box mt={4} mx="auto">
        <Button>Complete Verification</Button>
      </Box>
    </Flex>
  )
}

const StoreCard = () => {
  return (
    <Fragment>
      <StyledContainer flexDirection="column">
        <Flex alignItems="center">
          <StoreIconContainer>
            <img
              src="https://assets.api.uizard.io/api/cdn/stream/7e8b1883-e335-4103-8ffe-4b29ce546ffe.jpg"
              width={40}
              alt="store name"
            />
          </StoreIconContainer>
          <Box ml={3}>
            <BlockText>Lifestyle</BlockText>
          </Box>
        </Flex>
        <Box mt={3}>
          <PrimaryText>
            No.G-48, Ground Floor,142, Phoenix Market City, Velachery Rd, Indira
            Gandh Nagar, Velachery, Chennai, Tamil Nadu 600042, India
          </PrimaryText>
        </Box>
      </StyledContainer>
      <StyledContainer flexDirection="column">
        <Box>
          <StoreContactInfo />
        </Box>
      </StyledContainer>
      <StyledContainer flexDirection="column">
        <Box>
          <StoreProductInfo />
        </Box>
      </StyledContainer>
    </Fragment>
  )
}

export default StoreCard
