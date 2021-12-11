import styled from "@emotion/styled"
import React, { Fragment, useEffect, useState } from "react"
import { Flex } from "reflexbox"

const UploadContainer = styled("label")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px 10px 0 0;

  input {
    width: 100%;
    height: 100%;
    display: none;
  }

  img {
    border-radius: 10px 10px 0 0;
  }
`

const EditContainer = styled(Flex)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 4;
`

const EditOverlay = styled(Flex)`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgb(255, 255, 255, 0.6);
  border-radius: 10px 10px 0 0;
  z-index: 4;
`

const CloseContainer = styled(Flex)`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffbdbd;
  padding: 10px;
  z-index; 6;
`

function ImageUpload({ name, image, onLoad, isEdit }) {
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    setShowEdit(false)
  }, [image])

  const loadImage = (input) => {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        onLoad(e.target.result, input.target.files[0])
      }

      reader.readAsDataURL(input.target.files[0])
    }
  }

  return (
    <UploadContainer
      htmlFor={name}
      width="100%"
      onMouseLeave={() => setShowEdit(false)}
      onMouseOver={() => setShowEdit(true)}
    >
      <input id={name} type="file" onChange={loadImage} />
      <EditContainer />
      {!!image ? (
        <Fragment>
          {isEdit && showEdit && (
            <EditOverlay
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <img src="/assets/images/edit.svg" width={38} alt="edit image" />
            </EditOverlay>
          )}
          <CloseContainer
            alignItems="center"
            justifyContent="center"
            onClick={() => onLoad("", null)}
          >
            <img
              src="/assets/images/close.svg"
              width="10px"
              height="10px"
              alt="close"
            />
          </CloseContainer>
          <img src={image} width="100%" height="100%" alt="preview" />
        </Fragment>
      ) : (
        <img src="/assets/images/plus.svg" width={24} alt="add image" />
      )}
    </UploadContainer>
  )
}

ImageUpload.defaultProps = {
  isEdit: false,
}

export default ImageUpload
