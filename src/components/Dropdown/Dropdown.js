import React from "react"
import Downshift from "downshift"
import { Flex, Box } from "reflexbox"
import styled from "@emotion/styled"

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

  &:hover {
    box-shadow: 0px 0px 2px 0px rgb(115 113 113 / 75%) inset;
  }

  &:focus {
    border: 1px solid #c2c2c2;
    box-shadow: 0px 0px 2px 0px rgb(115 113 113 / 75%);
  }
`

const MenuContainer = styled(Flex)`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #c2c2c2;
  padding: 6px;
  background: #ffffff;
`

const StyledItem = styled(Box)`
  padding: 6px;
  margin: 2px 0;
  text-align: left;
  background-color: ${({ isSelected }) =>
    isSelected ? "#E2E2E2" : "transparent"};
  border-radius: 5px;

  &:hover {
    background: #f2f2f2;
    font-weight: 600;
  }
`

const Dropdown = ({ name, placeholder, label, items }) => {
  return (
    <Downshift
      onChange={(selection) =>
        console.log(
          selection ? `You selected ${selection.value}` : "Selection Cleared"
        )
      }
      itemToString={(item) => (item ? item.label : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <InputContainer width={1}>
            <label for={name} {...getLabelProps()}>
              {label}
              <Box {...getRootProps({}, { suppressRefError: true })}>
                <StyledInput
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  {...getInputProps()}
                />
              </Box>
            </label>
          </InputContainer>
          {isOpen ? (
            <MenuContainer {...getMenuProps()} flexDirection="column">
              {items
                .filter(
                  (item) => !inputValue || item.label.includes(inputValue)
                )
                .map((item, index) => (
                  <StyledItem
                    isSelected={selectedItem === item}
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                  >
                    {item.label}
                  </StyledItem>
                ))}
            </MenuContainer>
          ) : null}
        </div>
      )}
    </Downshift>
  )
}

export default Dropdown
