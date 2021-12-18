import styled from "@emotion/styled"
import React from "react"
import { Box, Flex } from "reflexbox"
import PropTypes from "prop-types"
import { Field, useFormikContext } from "formik"

import FormLabel from "../FormLabel/FormLabel"

const StyledInput = styled(Field)`
  background-color: #ffffff;
  color: #333333;
  padding: 8px 12px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  width: 100%;
  margin-top: 8px;
  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 20%);
  -webkit-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 0.2%);

  &::placeholder {
    color: #bbbbbb;
    font-weight: 400;
  }

  &:hover {
    box-shadow: 0px 0px 5px -1px rgb(115 113 113 / 75%) inset;
  }

  &:focus {
    border: 1px solid #d2d2d2;
    box-shadow: 0px 0px 5px -2px rgb(80 80 80 / 75%);
  }
`

const ErrorContainer = styled(Box)`
  color: red;
  font-size: 12px;
`

const Input = ({ name, placeholder, label, isRequired, maxlength }) => {
  const { errors } = useFormikContext()
  return (
    <Flex width={1} flexDirection="column">
      <Box>
        <FormLabel htmlFor={name} labelText={label} isRequired={isRequired} />
      </Box>
      <Box>
        <StyledInput
          id={name}
          name={name}
          placeholder={placeholder}
          maxLength={maxlength}
        />
      </Box>
      {!!errors[name] && <ErrorContainer mt={2}>{errors[name]}</ErrorContainer>}
    </Flex>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default Input
