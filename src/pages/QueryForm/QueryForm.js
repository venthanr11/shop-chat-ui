import React, { useState } from "react"
import styled from "@emotion/styled"
import { Flex, Box } from "reflexbox"
import { Formik, Form } from "formik"
import * as Yup from "yup"

import Input from "../../components/Input"
import Dropdown from "../../components/Dropdown"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import FormLabel from "../../components/FormLabel/FormLabel"
import FormSubmit from "../../components/FormSubmit"
import { FormLayout } from "../../components/Layouts"

const QueryHeading = styled("p")`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 21px;
  text-align: center;
`

const ImageUploadContainer = styled(Flex)`
  background: #ececec;
  width: 85px;
  height: 85px;
  border-radius: 10px;
  box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -webkit-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -moz-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 0.5%);
`

const FieldContainer = styled(Box)`
  max-width: 90%;
  width: 340px;
`

const categoryList = [
  { label: "Books", value: "books" },
  { label: "Toys", value: "toys" },
  { label: "Men's Wear", value: "mens_wear" },
  { label: "Women's Wear", value: "womens_wear" },
  { label: "Furnitures", value: "furnitures" },
]

const regionList = [
  { label: "Velachery", value: "velachery" },
  { label: "Adyar", value: "adyar" },
  { label: "Thiruvanmiyur", value: "thiruvanmiyur" },
  { label: "Adambakkam", value: "adambakkam" },
  { label: "Perungudi", value: "perungudi" },
]

const QueryForm = () => {
  const [images, setImages] = useState([])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    title: Yup.string().required("Product Title is required"),
    description: Yup.string(),
    categories: Yup.array().min(1, "Product Categories are required"),
    regions: Yup.array().min(1, "Area is required"),
    query_images: Yup.array(),
  })

  return (
    <FormLayout>
      <Box width={1}>
        <QueryHeading>What are you looking for?</QueryHeading>
      </Box>
      <Formik
        initialValues={{
          name: "",
          title: "",
          description: "",
          regions: [],
          categories: [],
          queryImages: [],
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 1500))
          console.log(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
          <FieldContainer mx="auto" mt={3}>
            <Input
              name="name"
              placeholder="John Doe"
              label="Your Name"
              isRequired
            />
          </FieldContainer>
          <FieldContainer mx="auto" mt="14px">
            <Input
              name="title"
              placeholder="Coffee Table"
              label="Product Title"
              isRequired
            />
          </FieldContainer>
          <FieldContainer mx="auto" mt="14px">
            <Input
              name="description"
              placeholder="Describe your product"
              label="Product Description"
            />
          </FieldContainer>
          <FieldContainer mx="auto" mt="14px">
            <Dropdown
              name="categories"
              placeholder="Product Category"
              label="Product Category"
              items={categoryList}
              isRequired
            />
          </FieldContainer>
          <FieldContainer mx="auto" mt="14px">
            <Dropdown
              name="regions"
              placeholder="Choose your area"
              label="Choose your area"
              items={regionList}
              isRequired
            />
          </FieldContainer>
          <FieldContainer mx="auto" mt="14px">
            <FormLabel labelText="Add Product Images" />
            <Flex flexWrap="wrap" mt={3}>
              {images.map((image, index) => {
                return (
                  <Box key={index} mr={3} mb={2}>
                    <ImageUploadContainer>
                      <ImageUpload name={`image-${index}`} image={image} />
                    </ImageUploadContainer>
                  </Box>
                )
              })}
              <Box>
                <ImageUploadContainer>
                  <ImageUpload
                    name="newImage"
                    onLoad={(image) =>
                      setImages(([...prevImages]) => {
                        prevImages.push(image)
                        return prevImages
                      })
                    }
                  />
                </ImageUploadContainer>
              </Box>
            </Flex>
          </FieldContainer>
          <FieldContainer className="text-center" mx="auto" mt={4}>
            <FormSubmit>Search</FormSubmit>
          </FieldContainer>
        </Form>
      </Formik>
    </FormLayout>
  )
}

export default QueryForm
