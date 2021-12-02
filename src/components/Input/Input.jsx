import styled from "@emotion/styled"
import React from "react"
import { Flex } from "reflexbox"
import PropTypes from "prop-types"

const InputContainer = styled(Flex)`
  label {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
`

const StyledInput = styled("input")`
  background-color: #ffffff;
  color: #333333;
  padding: 8px 12px;
  border: 1px solid #c2c2c2;
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

  &:hover {
    box-shadow: 0px 0px 2px 0px rgb(115 113 113 / 75%) inset;
  }

  &:focus {
    border: 1px solid #c2c2c2;
    box-shadow: 0px 0px 2px 0px rgb(115 113 113 / 75%);
  }
`

const Input = ({ name, placeholder, label, isRequired }) => {
  return (
    <InputContainer width={1}>
      <label for={name}>
        {label}
        <StyledInput id={name} name={name} placeholder={placeholder} />
      </label>
    </InputContainer>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default Input
