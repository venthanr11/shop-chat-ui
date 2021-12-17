import React, { Fragment, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Flex, Box } from "reflexbox"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

import Input from "../../components/Input"
import Dropdown from "../../components/Dropdown"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import FormLabel from "../../components/FormLabel/FormLabel"
import FormSubmit from "../../components/FormSubmit"
import { FormLayout } from "../../components/Layouts"
import { getData, postData } from "../../utils/api-helper"
import { getUserToken, setUserToken, uuid } from "../../utils/utility"

const QueryHeading = styled("p")`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 21px;
  text-align: center;
`

const ImageUploadContainer = styled(Flex)`
  background: #f8f3fdec;
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

const CategoryDropdowns = () => {
  const [departments, setDepartments] = useState([])
  const [categories, setCategories] = useState([])
  const [productCategories, setProductCategories] = useState([])

  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    getData({ url: "/department/v0/all" })
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

  return (
    <Fragment>
      <FieldContainer mx="auto" mt="14px">
        <Dropdown
          name="department_ids"
          placeholder="Department"
          label="Department"
          items={departments}
          onChange={(selectedDeps) =>
            setSelectedDepartments(Object.keys(selectedDeps))
          }
          isSingleSelect
        />
      </FieldContainer>
      <FieldContainer mx="auto" mt="14px">
        <Dropdown
          name="category_ids"
          placeholder="Categories"
          label="Categories"
          items={categories}
          noItemsMessage="Please choose `Departments` to proceed"
          onChange={(selectedCategs) =>
            setSelectedCategories(Object.keys(selectedCategs))
          }
          isSingleSelect
        />
      </FieldContainer>
      <FieldContainer mx="auto" mt="14px">
        <Dropdown
          name="categories"
          placeholder="Product Categories"
          label="Product Categories"
          items={productCategories}
          noItemsMessage="Please choose `Categories` to proceed"
        />
      </FieldContainer>
    </Fragment>
  )
}

const QueryForm = () => {
  const [images, setImages] = useState([])
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    title: Yup.string()
      .required("Product Title is required")
      .max(16, "Product Title must not exceed 16 characters"),
    description: Yup.string(),
    categories: Yup.array().min(1, "Product Categories are required"),
    regions: Yup.array().min(1, "Area is required"),
    query_images: Yup.array(),
  })

  const getUniqueUserToken = (name) => {
    return new Promise((resolve, reject) => {
      let userToken = getUserToken()
      if (!!userToken) {
        resolve(userToken)
      }
      const payload = {
        unique_client_id: uuid(),
        name,
        contact_number: "",
      }
      postData({ url: "/customer/v0/create", payload })
        .then(({ data }) => {
          setUserToken(data.uniqueId)
          resolve(data.uniqueId)
        })
        .catch((err) => console.log(err))
    })
  }

  const postQuery = (data, actions) => {
    getUniqueUserToken(data.name).then((userToken) => {
      const payload = {
        title: data.title,
        description: data.description,
        regions: data.regions,
        unique_client_id: userToken,
        categories: data.categories,
        query_images: data.query_images,
      }

      const formData = new FormData()
      Object.keys(payload).forEach((payloadKey) => {
        formData.append(payloadKey, payload[payloadKey])
      })
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      postData({ url: "/qi/v0/post_query", formData }, config)
        .then(({ data: { filteredResourceCount } }) => {
          actions.setSubmitting(false)
          navigate("contacting-stores")
        })
        .catch((err) => console.log(err))
    })
  }

  return (
    <FormLayout>
      <Flex flexDirection="column" width={1}>
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
            query_images: [],
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={postQuery}
        >
          {({ setFieldValue }) => (
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
                  max={16}
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
              <CategoryDropdowns />
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
                  {images.map(({ image }, index) => {
                    return (
                      <Box key={index} mr={3} mb={2}>
                        <ImageUploadContainer>
                          <ImageUpload
                            name={`image-${index}`}
                            image={image}
                            onLoad={(image, file) => {
                              setImages(([...prevImages]) => {
                                if (image === "" && file === null) {
                                  prevImages.splice(index, 1)
                                } else {
                                  prevImages.splice(index, 1, { image, file })
                                }
                                setFieldValue(
                                  "query_images",
                                  prevImages.map(({ file }) => file)
                                )
                                return prevImages
                              })
                            }}
                          />
                        </ImageUploadContainer>
                      </Box>
                    )
                  })}
                  {images.length < 5 && (
                    <Box>
                      <ImageUploadContainer>
                        <ImageUpload
                          name="newImage"
                          onLoad={(image, file) => {
                            setImages(([...prevImages]) => {
                              prevImages.push({ image, file })
                              setFieldValue(
                                "query_images",
                                prevImages.map(({ file }) => file)
                              )
                              return prevImages
                            })
                          }}
                        />
                      </ImageUploadContainer>
                    </Box>
                  )}
                </Flex>
              </FieldContainer>
              <FieldContainer className="text-center" mx="auto" mt={4}>
                <FormSubmit>Search</FormSubmit>
              </FieldContainer>
            </Form>
          )}
        </Formik>
      </Flex>
    </FormLayout>
  )
}

export default QueryForm
