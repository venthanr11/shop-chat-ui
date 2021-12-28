import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Flex, Box } from "reflexbox"
import { FormLayout } from "../../components/Layouts"
import { getData } from "../../utils/api-helper"
import { setShopName, setShopToken } from "../../utils/utility"
import StoreCard from "./StoreCard"

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
        setShopToken(data.resource.uniqueIdentifier)
        setShopName(data.resource.name)
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
