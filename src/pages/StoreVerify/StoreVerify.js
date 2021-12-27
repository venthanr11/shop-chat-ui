import styled from "@emotion/styled"
import axios from "axios"
import React, { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Flex, Box } from "reflexbox"
import { FormLayout } from "../../components/Layouts"
import { PrimaryText } from "../../components/Typography"
import { getData } from "../../utils/api-helper"
import { setCustomerToken } from "../../utils/utility"
import ShopchatInfo from "./ShopchatInfo"
import StoreCard from "./StoreCard"

const Stepper = styled(Flex)`
  width: 75%;
  height: 3px;
  background: #dedede;
  position: relative;
  margin: 24px auto;
`

const StepContainer = styled(Box)`
  position: relative;
  margin-left: ${({ stepNum }) => (stepNum === 0 ? "0" : "50%")};
`

const Step = styled(Box)`
  position: absolute;
  top: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #8a2be2;
  z-index: 2;
`

const Connector = styled(Box)`
  position: absolute;
  top: 0;
  left: 6px;
  width: ${({ stepNum }) => `calc(50% * ${stepNum})`};
  height: 3px;
  background: #ae80d8;
  z-index: 1;
`

const VerificationContainer = styled(Box)`
  width: 391px;
  max-width: 90%;
`

const StoreVerify = () => {
  const { storeIdentifier } = useParams()
  const [storeInfo, setStoreInfo] = useState(null)
  const [wizardState, setWizardState] = useState(0)

  useEffect(() => {
    getData({
      url: `/resource/v0/resource_profile/${storeIdentifier}`,
    })
      .then(({ data }) => {
        setCustomerToken(data.uniqueIdentifier)
        setStoreInfo(data)
      })
      .catch((err) => console.log(err))
  }, [])

  if (!storeInfo) {
    return null
  }
  return (
    <FormLayout isStore>
      <Flex justifyContent="space-evenly" width={1} flexWrap="wrap-reverse">
        <VerificationContainer mx={3}>
          <Box>
            <StoreCard
              wizardState={wizardState}
              storeInfo={storeInfo}
              onWizardUpdate={(updatedWizardState) =>
                setWizardState(updatedWizardState)
              }
            ></StoreCard>
          </Box>
        </VerificationContainer>
      </Flex>
    </FormLayout>
  )
}

export default StoreVerify
