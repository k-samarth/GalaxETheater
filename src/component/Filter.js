import React from 'react'
import { Box, Button, InputGroup, LinkBox, Input, Flex } from "@chakra-ui/react";
import { MdTune } from "react-icons/md";
import "./Filter.css"
function Filter() {
  return (
    <div className="filters">
      <Box padding="2%">
        <Flex>
          <Button
            flex="1"
            variant="ghost"
            className="All"
            color="white"
            margin="0% 5%"
            bg="#EB4E62"
          >
            All
          </Button>
          <InputGroup>
            <Input placeholder="Name/City/Address" maxW="sm"></Input>
            <Button
              leftIcon={<MdTune />}
              colorScheme="gray"
              variant="solid"
              margin=" 0% 5%"
              padding="0% 3%"
            >
              Filter
            </Button>
            <Button
              leftIcon={<MdTune />}
              bg="#EB4E62"
              color="white"
              variant="solid"
              margin=" 0% 5%"
              padding="0% 3%"
            >
              Add Theater
            </Button>
          </InputGroup>
        </Flex>
      </Box>
    </div>
  );
}

export default Filter