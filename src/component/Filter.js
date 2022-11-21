import React from "react";
import {
  Box,
  Button,
  InputGroup,
  LinkBox,
  Input,
  Flex,
  Stack,
  Select,
} from "@chakra-ui/react";
import { MdTune } from "react-icons/md";
import {TbLayoutGridAdd} from "react-icons/tb";
import "./Filter.css";

// var e = document.getElementById("FilterOption");
// var value = e.value;
// var text = e.options[e.selectedIndex].text;
function Filter() {
  return (
    <div>
      <Box padding="2%">
        <Flex className="filters">
          <Button
            flex="1"
            variant="ghost"
            className="All"
            color="white"
            bg="#EB4E62"
            padding="0% 5%"
            margin="0% 1%"
          >
            {"All"}
            {/* {text} */}
          </Button>
          <Button
            flex="1"
            variant="ghost"
            className="All"
            color="white"
            padding="0% 5%"
            bg="#EB4E62"
            margin="0% 1%"
          >
            City
          </Button>
          <InputGroup>
            <Input placeholder="Name/City/Address" maxW="sm"></Input>

            <Stack margin="0% 2%">
              <Select icon={<MdTune />} bg="ButtonFace" id="FilterOption">
                <option value="Filter" disabled selected>
                  Filter
                </option>
                <option value="ByName">By Name</option>
                <option value="ByCity">By City</option>
                <option value="All">All</option>
              </Select>
            </Stack>
            <Button
              leftIcon={<TbLayoutGridAdd />}
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

export default Filter;
