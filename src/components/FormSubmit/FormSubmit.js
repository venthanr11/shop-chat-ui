import React from "react"
import { useFormikContext } from "formik"
import { Box } from "reflexbox"
import styled from "@emotion/styled"

import Button from "../Button"
import { Spinner } from "../Loaders"

const SpinnerContainer = styled(Box)`
  position: absolute;
  right: 10px;
  top: 10px;
  display: inline-block;
`

const FormSubmit = ({ children }) => {
  const { submitForm, isSubmitting } = useFormikContext()
  return (
    <Button htmlType="submit" onClick={submitForm} disabled={isSubmitting}>
      {children}
      {isSubmitting && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Button>
  )
}

export default FormSubmit
