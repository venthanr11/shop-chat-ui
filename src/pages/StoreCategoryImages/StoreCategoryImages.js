import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Flex, Box } from "reflexbox"
import Button from "../../components/Button"
import ImageUpload from "../../components/ImageUpload/ImageUpload"
import { FormLayout } from "../../components/Layouts"
import { BlockText } from "../../components/Typography"
import { getData, postData } from "../../utils/api-helper"

const ImageListContainer = styled(Flex)`
  justify-content: ${({ isEmpty }) => (isEmpty ? "center" : "flex-start")};
  align-items: ${({ isEmpty }) => (isEmpty ? "center" : "flex-start")};
  height: 100%;
`

const ImageUploadContainer = styled(Flex)`
  background: #f8f3fdec;
  width: ${({ isEmpty }) => (isEmpty ? "180px" : "85px")};
  height: ${({ isEmpty }) => (isEmpty ? "180px" : "85px")};
  border-radius: 10px;
  box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -webkit-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 50%);
  -moz-box-shadow: 3px 3px 6px -5px rgb(0 0 0 / 0.5%);
`

const StoreCategoryImages = () => {
  const [images, setImages] = useState([])
  const [imagesToAdd, setImagesToAdd] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
  const navigate = useNavigate()
  const { resourceId, categoryId } = useParams()

  useEffect(() => {
    postData({
      url: `/resource/v0/get_images_for_category?resource_unique_id=${resourceId}&category_id=${categoryId}`,
    })
      .then(({ data }) =>
        setImages(
          data.map(({ id, mediaURL }) => ({
            image: mediaURL,
            id,
          }))
        )
      )
      .catch((e) => console.log(e))
  }, [])

  const addCategoryImages = () => {
    if (imagesToAdd.length === 0) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("resource_unique_id", resourceId)
      formData.append("category_id", categoryId)
      imagesToAdd.forEach(({ image, file }) => {
        formData.append("category_images", file)
      })
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      postData(
        {
          url: "/resource/v0/add_images_to_category",
          payload: formData,
        },
        config
      )
        .then(resolve)
        .catch(reject)
    })
  }

  const removeCategoryImages = () => {
    if (imagesToDelete.length === 0) {
      return Promise.resolve()
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    return new Promise((resolve, reject) => {
      const queryParams = imagesToDelete.map((id) => `image_ids=${id}`)
      postData({
        url: `/resource/v0/delete_images_from_category?${queryParams.join(
          "&"
        )}`,
      }, config)
        .then(resolve)
        .catch(reject)
    })
  }

  return (
    <FormLayout>
      <Flex flexDirection="column" width={1} p={3}>
        <Box className="text-center" m={2}>
          <BlockText>Add Product Images</BlockText>
        </Box>
        <Box className="flex-grow" pt={3} my={4}>
          <ImageListContainer flexWrap="wrap" isEmpty={images.length === 0}>
            {images.map(({ image, id }, index) => {
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
                          return prevImages
                        })
                        if (image === "" && file === null) {
                          if (!!id) {
                            setImagesToDelete(([...prevImagesToDelete]) => {
                              prevImagesToDelete.push(id)
                              return prevImagesToDelete
                            })
                          }
                        } else {
                          setImagesToDelete(([...prevImagesToDelete]) => {
                            prevImagesToDelete.push(id)
                            return prevImagesToDelete
                          })
                          setImagesToAdd(([...prevImagesToAdd]) => {
                            prevImagesToAdd.push({ image, file })
                            return prevImagesToAdd
                          })
                        }
                      }}
                    />
                  </ImageUploadContainer>
                </Box>
              )
            })}
            {images.length < 5 && (
              <Box>
                <ImageUploadContainer isEmpty={images.length === 0}>
                  <ImageUpload
                    name="newImage"
                    onLoad={(image, file) => {
                      setImages(([...prevImages]) => {
                        prevImages.push({ image, file })
                        return prevImages
                      })
                      setImagesToAdd(([...prevImagesToAdd]) => {
                        prevImagesToAdd.push({ image, file })
                        return prevImagesToAdd
                      })
                    }}
                  />
                </ImageUploadContainer>
              </Box>
            )}
          </ImageListContainer>
        </Box>
        <Box className="text-center">
          <Flex width="100%" flexWrap="wrap" justifyContent="space-between">
            <Box mt={2} mx="auto">
              <Button type="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
            <Box
              mt={2}
              mx="auto"
              onClick={() => {
                Promise.all([addCategoryImages(), removeCategoryImages()])
                  .then(() => navigate(-1))
                  .catch((e) => console.log(e))
              }}
            >
              <Button>Update</Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </FormLayout>
  )
}

export default StoreCategoryImages
