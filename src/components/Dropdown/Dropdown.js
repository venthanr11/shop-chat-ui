import React, { Fragment, useEffect, useState } from "react"
import Downshift from "downshift"
import { Flex, Box } from "reflexbox"
import styled from "@emotion/styled"
import Tags from "../Tags"
import { PrimaryText } from "../Typography"
import FormLabel from "../FormLabel/FormLabel"
import { useFormikContext } from "formik"

const DropdownTrigger = styled(Flex)`
  background-color: #ffffff;
  color: #333333;
  padding: 4px 12px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  width: 100%;
  margin-top: 8px;
  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 20%);
  -webkit-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 0.2%);

  &:hover {
    box-shadow: 0px 0px 5px -1px rgb(115 113 113 / 75%) inset;
  }

  &:focus-within {
    border: 1px solid #d4d4d4;
    box-shadow: 0px 0px 5px -2px rgb(115 113 113 / 75%);
  }
`

const StyledInputContainer = styled(Box)`
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  margin-bottom: 4px;
`

const StyledInput = styled("input")`
  background: transparent;
  color: #333333;
  padding: 8px 10px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  border: none;
  outline: none;
  width: 100%;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &::placeholder {
    color: #bbbbbb;
    font-weight: 400;
  }
`

const MenuContainer = styled(Flex)`
  width: 100%;
  border-radius: 5px;
  border: none;
  padding: 6px;
  background: #ffffff;
  box-shadow: 0px 0px 5px -2px rgb(80 80 80 / 75%);
  margin-top: 4px;
`

const StyledItem = styled(Box)`
  padding: 8px 6px;
  margin: 2px 0;
  text-align: left;
  background-color: ${({ isSelected, isHighlighted }) =>
    isSelected || isHighlighted ? "#f2f2f2" : "transparent"};
  border-radius: 5px;
  font-weight: ${({ isSelected }) => (isSelected ? 500 : 400)};
  cursor: pointer;
`

const ChevronButton = styled(Box)`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  margin-top: ${({ isOpen }) => (isOpen ? "0" : "6px")};
  margin-bottom: ${({ isOpen }) => (isOpen ? "6px" : "0")}; ;
`

const ErrorContainer = styled(Box)`
  color: red;
  font-size: 12px;
`

const Dropdown = ({
  name,
  placeholder,
  label,
  items,
  isRequired,
  noItemsMessage,
  onChange,
  isSingleSelect,
}) => {
  const [searchKey, setSearchKey] = useState("")
  const [selectedItems, setSelectedItems] = useState({})
  const { errors, setFieldValue } = useFormikContext()

  const removeItem = (itemKey) => {
    const { [itemKey]: itemToRemove, ...rest } = selectedItems
    setSelectedItems(rest)
    onChange(rest)
  }

  const filteredItems = items.filter(
    (item) =>
      !searchKey ||
      item.label.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
  )

  useEffect(() => {
    const selectedItemKeys = Object.keys(selectedItems)
    if (selectedItemKeys.length === 0) {
      return
    }
    onChange(selectedItems)
    setFieldValue(
      name,
      selectedItemKeys.map((item) => selectedItems[item])
    )
  }, [selectedItems])

  return (
    <Downshift
      onSelect={(selection) => {
        setSearchKey("")
        if (!!selectedItems[selection.value]) {
          removeItem(selection.value)
          return
        }
        if (isSingleSelect) {
          setSelectedItems({ [selection.value]: selection })
          return
        }
        setSelectedItems((items) => ({
          ...items,
          [selection.value]: selection,
        }))
      }}
      itemToString={(item) => (item ? item.label : "")}
    >
      {({
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        getRootProps,
        openMenu,
      }) => (
        <div>
          <Flex width={1} flexDirection="column">
            <FormLabel
              htmlFor={name}
              {...getLabelProps()}
              labelText={label}
              isRequired
            />
            <DropdownTrigger alignItems="center" onClick={() => openMenu()}>
              <Box className="flex-grow">
                {!!Object.keys(selectedItems).length ? (
                  isSingleSelect ? (
                    <PrimaryText>
                      {selectedItems[Object.keys(selectedItems)[0]].label}
                    </PrimaryText>
                  ) : (
                    <Flex flexWrap="wrap">
                      {Object.keys(selectedItems).map((itemKey, index) => (
                        <Box mr={1} my="2px" key={index}>
                          <Tags
                            id={selectedItems[itemKey].value}
                            text={selectedItems[itemKey].label}
                            onClose={() => {
                              removeItem(selectedItems[itemKey].value)
                            }}
                          />
                        </Box>
                      ))}
                    </Flex>
                  )
                ) : (
                  <PrimaryText type="placeholder">{placeholder}</PrimaryText>
                )}
              </Box>
              <Box>
                <ChevronButton isOpen={isOpen} mt="6px">
                  <img
                    src="/assets/images/chevron-down.svg"
                    width={14}
                    alt="dropdown"
                  />
                </ChevronButton>
              </Box>
            </DropdownTrigger>
          </Flex>
          {isOpen ? (
            <MenuContainer {...getMenuProps()} flexDirection="column">
              <StyledInputContainer className="flex-grow">
                <StyledInput
                  id={name}
                  name={name}
                  placeholder={`Search ${placeholder}`}
                  value={searchKey}
                  onChange={(e) => {
                    if (!isOpen) {
                      openMenu()
                    }
                    setSearchKey(e.target.value)
                  }}
                  disabled={
                    isSingleSelect &&
                    !!Object.keys(selectedItems).length &&
                    !isOpen
                  }
                />
              </StyledInputContainer>
              {filteredItems.length === 0 ? (
                <Flex justifyContent="center" alignItems="center" p={2}>
                  <Box mt="6px">
                    <img
                      src="/assets/images/not-found.svg"
                      width={18}
                      alt="no items found"
                    />
                  </Box>
                  <Box mt={1} ml={2}>
                    <PrimaryText size={12} weight={600}>
                      {noItemsMessage}
                    </PrimaryText>
                  </Box>
                </Flex>
              ) : (
                filteredItems.map((item, index) => (
                  <StyledItem
                    isHighlighted={highlightedIndex === index}
                    isSelected={!!selectedItems[item.value]}
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                  >
                    {item.label}
                  </StyledItem>
                ))
              )}
            </MenuContainer>
          ) : (
            !!errors[name] && (
              <ErrorContainer mt={2}>{errors[name]}</ErrorContainer>
            )
          )}
        </div>
      )}
    </Downshift>
  )
}

Dropdown.defaultProps = {
  noItemsMessage: "No items found",
  onChange: () => {},
  isSingleSelect: false,
}

export default Dropdown
