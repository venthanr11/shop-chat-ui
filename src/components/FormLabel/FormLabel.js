import styled from "@emotion/styled"
import React from "react"

const StyledLabel = styled("label")`
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  letter-spacing: 0.5px;
  cursor: pointer;

  ${({ isRequired }) =>
    isRequired
      ? `
      &:after {
        content: " *";
        color: red;
      }
    `
      : ""}
`

function FormLabel({ labelText, isRequired }) {
  return <StyledLabel isRequired={isRequired}>{labelText}</StyledLabel>
}

export default FormLabel
