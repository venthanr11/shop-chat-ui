import styled from "@emotion/styled"
import React from "react"
import { Flex, Box } from "reflexbox"
import { FormLayout } from "../../components/Layouts"
import { EllipsisLoader, Spinner } from "../../components/Loaders"
import { BlockText, PrimaryText } from "../../components/Typography"

const pointerTypes = {
  success: "#089458",
  inProgress: "#fdaf01",
  waiting: "#b1b1b1",
}

const StatusContainer = styled(Flex)`
  position: relative;
`

const Pointer = styled(Flex)`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ type }) => pointerTypes[type]};
  z-index: 2;
  flex-shrink: 0;
`

const Connector = styled(Box)`
  position: absolute;
  width: 0px;
  height: 90%;
  border-left: 2px dashed #a8a8a8;
  top: 14px;
  left: 4.5px;
  z-index: 1;
`

const QueryInProgress = ({}) => {
  return (
    <FormLayout>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="height-inherit"
      >
        <Box>
          <Spinner size="lg" />
        </Box>
        <Box mt={4}>
          <StatusContainer flexDirection="column">
            <Connector />
            <Flex alignItems="center">
              <Pointer type="success" />
              <Box ml={3} className="flex-grow">
                <PrimaryText type="success">
                  Creating your chat site
                </PrimaryText>
              </Box>
              <Box ml={4} mt={1}>
                <img
                  src="/assets/images/verified.svg"
                  width={16}
                  alt="chat site created"
                />
              </Box>
            </Flex>
            <Flex alignItems="center" mt={4}>
              <Pointer type="inProgress" />
              <Box ml={3} className="flex-grow">
                <BlockText>Contacting stores near you</BlockText>
              </Box>
              <Box ml={4} mt={1}>
                <EllipsisLoader />
              </Box>
            </Flex>
            <Flex alignItems="center" mt={4}>
              <Pointer type="waiting" />
              <Box ml={3} className="flex-grow">
                <PrimaryText type="secondary">
                  Setting up your workspace
                </PrimaryText>
              </Box>
              <Box ml={4} mt={1}>
                <img
                  src="/assets/images/pending.svg"
                  width={16}
                  alt="chat site created"
                />
              </Box>
            </Flex>
            <Flex alignItems="center" mt={4}>
              <Pointer type="waiting" />
              <Box ml={3} className="flex-grow">
                <PrimaryText type="secondary">
                  Redirecting to your chat site
                </PrimaryText>
              </Box>
              <Box ml={4} mt={1}>
                <img
                  src="/assets/images/pending.svg"
                  width={16}
                  alt="chat site created"
                />
              </Box>
            </Flex>
          </StatusContainer>
        </Box>
      </Flex>
    </FormLayout>
  )
}

export default QueryInProgress
