import styled from "@emotion/styled"
import React from "react"
import { Flex } from "reflexbox"

const StyledSpinner = styled(Flex)`
  .loader {
    border-radius: 50%;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
  }

  .loader-sm {
    width: 20px;
    height: 20px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #3498db;
  }

  .loader-md {
    width: 40px;
    height: 40px;
    border: 6px solid #e0e0e0;
    border-top: 6px solid #3498db;
  }

  .loader-lg {
    width: 60px;
    height: 60px;
    border: 8px solid #e0e0e0;
    border-top: 8px solid #3498db;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Spinner = ({ size }) => {
  return (
    <StyledSpinner>
      <div className={`loader loader-${size}`}></div>
    </StyledSpinner>
  )
}

Spinner.defaultProps = {
  size: "sm",
}

export default Spinner
