import styled from "@emotion/styled"
import React from "react"

const UploadContainer = styled("label")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  input {
    width: 100%;
    height: 100%;
    display: none;
  }

  img {
    border-radius: 10px;
  }
`

function ImageUpload({ name, image, onLoad }) {
  const loadImage = (input) => {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        onLoad(e.target.result)
      }

      reader.readAsDataURL(input.target.files[0])
    }
  }

  return (
    <UploadContainer htmlFor={name} width="100%">
      <input id={name} type="file" onChange={loadImage} />
      {!!image ? (
        <img src={image} width="100%" alt="preview" />
      ) : (
        <img src="/assets/images/plus.svg" width={24} alt="add product" />
      )}
    </UploadContainer>
  )
}

export default ImageUpload
