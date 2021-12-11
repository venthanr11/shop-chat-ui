import React, { Fragment, useEffect, useState } from "react"
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
import { getData, postData } from "../../utils/api-helper"
import CONSTANTS from "../../utils/const"

const StyledContainer = styled(Flex)`
  width: 100%;
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

const StoreInfo = ({ storeInfo, onNext }) => {
  const [storeProfileImage, setStoreProfileImage] = useState(storeInfo.imgUrl)
  return (
    <Fragment>
      <Flex width={1} flexDirection="column">
        <StoreIconContainer>
          <ImageUpload
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
                  url: `/resource/v0/update_profile_image/${storeInfo.id}`,
                  payload: formData,
                },
                config
              )
                .then(({ data }) => setStoreProfileImage(data))
                .catch((err) => console.log(err))
            }}
            isEdit={true}
          />
          <StoreIconGradient />
        </StoreIconContainer>
        <Box mt={4}>
          <Flex>
            <Box ml={2}>
              <BlockText>{storeInfo.name}</BlockText>
            </Box>
          </Flex>
        </Box>
        <Box mt={3}>
          <Flex>
            <Box ml={2}>
              <PrimaryText size={12} weight={500}>
                {storeInfo.formattedAddress}
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

const StoreContactInfo = ({ storeInfo, onPrevious, onNext }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    designation: Yup.array().min(1, "Designation is required"),
    contact_number: Yup.string().required("Mobile Number is required"),
  })

  const postPoC = (data, actions) => {
    const payload = {
      resource_id: storeInfo.id,
      contact_number: data.contact_number,
      name: data.name,
      designation: data.designation[0].value,
      is_primary_poc: true,
      is_whatsapp_enabled: true,
    }
    postData({ url: "/resource/v0/add_poc", payload })
      .then(() => {
        actions.setSubmitting(false)
        onNext()
      })
      .catch((err) => {
        actions.setSubmitting(false)
        console.log(err.message)
      })
  }

  return (
    <Formik
      initialValues={{
        name: "",
        designation: [],
        contact_number: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={postPoC}
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
              items={CONSTANTS.DESIGNATIONS}
              isRequired
              isSingleSelect
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
          <Box mt={3}>
            <Flex width="100%" flexWrap="wrap" justifyContent="space-between">
              <Box mt={2} mx="auto">
                <Button type="secondary" onClick={onPrevious}>
                  Back
                </Button>
              </Box>
              <Box mt={2} mx="auto">
                <FormSubmit>Update</FormSubmit>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}

const StoreProductInfo = ({ storeInfo, onPrevious, onNext }) => {
  const [departments, setDepartments] = useState([])
  const [categories, setCategories] = useState([])
  const [productCategories, setProductCategories] = useState([])

  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    getData({ url: "/department/v0/" })
      .then(({ data }) =>
        setDepartments(data.map(({ id, name }) => ({ label: name, value: id })))
      )
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (!selectedDepartments.length) {
      setCategories([])
      return
    }
    const payload = {
      department_ids: [...selectedDepartments],
    }
    postData({ url: "/category/v0/department/", payload })
      .then(({ data }) =>
        setCategories(data.map(({ id, name }) => ({ label: name, value: id })))
      )
      .catch((error) => console.log(error))
  }, [selectedDepartments])

  useEffect(() => {
    if (!selectedCategories.length) {
      setProductCategories([])
      return
    }
    const payload = {
      category_ids: [...selectedCategories],
    }
    postData({ url: "/product_category/v0/category", payload })
      .then(({ data }) =>
        setProductCategories(
          data.map(({ id, name }) => ({ label: name, value: id }))
        )
      )
      .catch((error) => console.log(error))
  }, [selectedCategories])

  const validationSchema = Yup.object().shape({
    sub_category_ids: Yup.array().min(1, "Product Categories are required"),
  })

  const postProductCategories = (data, actions) => {
    const payload = {
      resource_id: storeInfo.id,
      sub_category_ids: data.sub_category_ids.map(
        (subCategoryId) => subCategoryId.value
      ),
    }
    postData({ url: "/resource/v0/update_product_categories", payload })
      .then(() => {
        actions.setSubmitting(false)
        alert("Verification Successful")
      })
      .catch((err) => {
        actions.setSubmitting(false)
        console.log(err.message)
      })
  }

  return (
    <Formik
      initialValues={{
        sub_category_ids: [],
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={postProductCategories}
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
              name="department_ids"
              placeholder="Department"
              label="Department"
              items={departments}
              onChange={(selectedDeps) =>
                setSelectedDepartments(Object.keys(selectedDeps))
              }
            />
          </Box>
          <Box mt={3}>
            <Dropdown
              name="category_ids"
              placeholder="Categories"
              label="Categories"
              items={categories}
              noItemsMessage="Please choose `Departments` to proceed"
              onChange={(selectedCategs) =>
                setSelectedCategories(Object.keys(selectedCategs))
              }
            />
          </Box>
          <Box mt={3}>
            <Dropdown
              name="sub_category_ids"
              placeholder="Product Categories"
              label="Product Categories"
              items={productCategories}
              noItemsMessage="Please choose `Categories` to proceed"
            />
          </Box>
          <Box mt={3}>
            <Flex width="100%" flexWrap="wrap" justifyContent="space-between">
              <Box mt={2} mx="auto">
                <Button type="secondary" onClick={onPrevious}>
                  Back
                </Button>
              </Box>
              <Box mt={2} mx="auto">
                <FormSubmit>Verify</FormSubmit>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Form>
    </Formik>
  )
}

const StoreCard = ({ storeInfo }) => {
  const [wizardState, setWizardState] = useState(0)

  return (
    <Flex flexDirection="column">
      <StyledContainer flexDirection="column">
        {wizardState === 0 ? (
          <StoreInfo
            storeInfo={storeInfo}
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        ) : wizardState === 1 ? (
          <StoreContactInfo
            storeInfo={storeInfo}
            onPrevious={() => setWizardState((wizardState) => --wizardState)}
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        ) : (
          <StoreProductInfo
            storeInfo={storeInfo}
            onPrevious={() => setWizardState((wizardState) => --wizardState)}
            onNext={() => setWizardState((wizardState) => ++wizardState)}
          />
        )}
      </StyledContainer>
    </Flex>
  )
}

export default StoreCard
