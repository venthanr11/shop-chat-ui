import React from "react"
import styled from "@emotion/styled"
import { Flex, Box } from "reflexbox"

import Input from "../../components/Input"
import Dropdown from "../../components/Dropdown"

const QueryFormContainer = styled(Flex)`
  background-color: #f0f4f7;
  padding: 10px;
  border-radius: 10px;
  border: 0px;
  margin: 12px;
`

const QueryHeading = styled("p")`
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 21px;
  text-align: center;
`

const items = [
  { label: "Books", value: "books" },
  { label: "Toys", value: "toys" },
  { label: "Men's Wear", value: "mens_wear" },
  { label: "Women's Wear", value: "womens_wear" },
  { label: "Furnitures", value: "furnitures" },
]

const QueryForm = () => {
  return (
    <QueryFormContainer>
      <Flex width={1} flexDirection="column">
        <Box width={1}>
          <QueryHeading>What are you looking for?</QueryHeading>
        </Box>
        <Box width={3 / 4} mx="auto" mt={3}>
          <Input
            name="title"
            placeholder="Product Title"
            label="Product Title"
          />
        </Box>
        <Box width={3 / 4} mx="auto" mt={4}>
          <Input
            name="description"
            placeholder="Product Description"
            label="Product Description"
          />
        </Box>
        <Box width={3 / 4} mx="auto" mt={4}>
          <Dropdown
            name="category"
            placeholder="Product Category"
            label="Product Category"
            items={items}
          />
        </Box>
      </Flex>
    </QueryFormContainer>
  )
}

export default QueryForm
