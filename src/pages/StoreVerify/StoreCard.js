import React, { Fragment, useState } from "react"
import styled from "@emotion/styled"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Box, Flex } from "reflexbox"

import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import Input from "../../components/Input"
import {
  BlockText,
  PrimaryText,
  SectionHeading,
  CalloutText,
} from "../../components/Typography"
import FormSubmit from "../../components/FormSubmit"

const StyledContainer = styled(Flex)`
  background: white;
  border-radius: 10px;
  margin: 20px auto;
  padding: 16px;
  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 30%);
  -webkit-box-shadow: 0px 0px 8px -3px rgb(0 0 0 / 30%);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
`

const StoreIconContainer = styled(Box)`
  position: relative;
  width: calc(100% + 32px);
  height: 180px;
  background: ${({ url }) => `url("${url}") no-repeat`};
  background-color: #d3d3d3;
  background-size: 100% 180px;
  margin: -16px;
  border-radius: 10px 10px 0 0;
`

const StoreIconGradient = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px -60px 57px -22px rgb(21 21 21 / 75%) inset;
  -webkit-box-shadow: 2px -60px 57px -22px rgb(21 21 21 / 75%) inset;
  -moz-box-shadow: 2px -60px 57px -22px rgba(21, 21, 21, 0.75) inset;
  z-index: 3;
`

const StyledCallout = styled(Box)`
  padding: 8px;
  background: #ffffff;
  border: 2px solid #ff3b3b;
  border-radius: 6px;
`

const StoreInfo = ({ onNext }) => {
  const [storeProfileImage, setStoreProfileImage] = useState(
    "https://img.freepik.com/free-vector/season-sale_62951-24.jpg?size=626&ext=jpg"
  )
  return (
    <Fragment>
      <Flex width={1} flexDirection="column">
        <StoreIconContainer>
          <ImageUpload
            name="storeProfileImage"
            image={storeProfileImage}
            onLoad={(image) => setStoreProfileImage(image)}
            isEdit={true}
          />
          <StoreIconGradient />
        </StoreIconContainer>
        <Box mt={4}>
          <Flex>
            <Box ml={2}>
              <BlockText>Lifestyle</BlockText>
            </Box>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <Box ml={2}>
              <PrimaryText size={12} weight={500}>
                No.G-48, Ground Floor,142, Phoenix Market City, Velachery Rd,
                Indira Gandh Nagar, Velachery, Chennai, Tamil Nadu 600042, India
              </PrimaryText>
            </Box>
          </Flex>
        </Box>
        <Box mt={3} mx="auto">
          <Flex>
            <Button onClick={onNext}>Next</Button>
          </Flex>
        </Box>
      </Flex>
    </Fragment>
  )
}

const designationList = [
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Storekeeper",
    value: "storekeeper",
  },
  {
    label: "Proprietor",
    value: "proprietor",
  },
]

const StoreContactInfo = ({ onPrevious, onNext }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    designation: Yup.array(),
    contact_number: Yup.string().required("Mobile Number is required"),
  })

  return (
    <Formik
      initialValues={{
        name: "",
        designation: "",
        contact_number: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log(JSON.stringify(values, null, 2))
        onNext()
      }}
    >
      <Form>
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
          <Box mt={2}>
            <PrimaryText size={13}>
              This will be your shop's primary contact for customers. The mobile
              number entered here will be enabled to chat with customers &
              update shop data.
            </PrimaryText>
          </Box>
          <StyledCallout mt={4}>
            <CalloutText>
              It is important to update this accurately. Please ensure this is
              Whatsapp enabled to receive rich notifications from customers.
            </CalloutText>
          </StyledCallout>
          <Box mt={4}>
            <Input
              name="name"
              placeholder="Primary Contact Name"
              label="Primary Contact Name"
              isRequired
            />
          </Box>
          <Box mt={3}>
            <Dropdown
              name="designation"
              placeholder="Designation"
              label="Designation"
              items={designationList}
              isRequired
            />
          </Box>
          <Box mt={3}>
            <Input
              name="contact_number"
              placeholder="Mobile Number"
              label="Mobile Number"
              isRequired
            />
          </Box>
          <Box mt={3} mx="auto">
            <Flex>
              <Box>
                <Button type="secondary" onClick={onPrevious}>
                  Back
                </Button>
              </Box>
              <Box ml={3}>
                <FormSubmit>Update</FormSubmit>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}

const StoreProductInfo = ({ onPrevious, onNext }) => {
  const validationSchema = Yup.object().shape({
    sub_category_ids: Yup.array().min(1),
  })
  return (
    <Formik
      initialValues={{
        sub_category_ids: [],
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log(JSON.stringify(values, null, 2))
        onNext()
      }}
    >
      <Form>
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
          <Box mt={2}>
            <PrimaryText size={13}>
              Please select detailed product categories of product you hold in
              your shop. You can select multiple categories. Please select
              carefully and accurately.
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
              name="sub_catergory_ids"
              placeholder="Product Categories"
              label="Product Categories"
              items={[]}
            />
          </Box>
          <Box mt={3} mx="auto">
            <Flex>
              <Box>
                <Button type="secondary" onClick={onPrevious}>
                  Back
                </Button>
              </Box>
              <Box ml={3}>
                <FormSubmit>Complete Verification</FormSubmit>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}

const StoreCard = () => {
  const [wizardState, setWizardState] = useState(0)

  return (
    <Flex flexDirection="column">
      <StyledContainer flexDirection="column">
        {wizardState === 0 ? (
          <StoreInfo
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        ) : wizardState === 1 ? (
          <StoreContactInfo
            onPrevious={() => setWizardState((wizardState) => --wizardState)}
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        ) : (
          <StoreProductInfo
            onPrevious={() => setWizardState((wizardState) => --wizardState)}
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        )}
      </StyledContainer>
    </Flex>
  )
}

export default StoreCard
