import styled from "@emotion/styled"
import React from "react"
import { Box } from "reflexbox"

const LoaderContainer = styled(Box)`
  .loading {
    font-size: 30px;
  }

  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis ease 900ms infinite;
    animation: ellipsis ease 900ms infinite;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
`

const EllipsisLoader = () => {
  return (
    <LoaderContainer width="21px">
      <div className="loading"></div>
    </LoaderContainer>
  )
}

export default EllipsisLoader
