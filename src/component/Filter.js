import React, { useState } from "react";
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
import { TbLayoutGridAdd } from "react-icons/tb";
import "./Filter.css";

// var e = document.getElementById("FilterOption");
// var value = e.value;
// var text = e.options[e.selectedIndex].text;
function Filter(props) {
  const [filter, setFilter] = useState("Filter");

  return (
    <div>
      <Box padding="2%" width="100%">
        <Flex className="filters" justifyContent="space-between" >
          <Button
            flex="1"
            
            variant="ghost"
            className="All"
            color="white"
            bg="#EB4E62"
            padding="0% 5%"
            margin="0% 1%"
          >
            {filter}
            {/* {text} */}
          </Button>
          
          <InputGroup>
            <Input placeholder="Name/City/Address" maxW="sm"></Input>

            <Stack margin="0% 2%">
              <Select
                icon={<MdTune />}
                bg="ButtonFace"
                id="FilterOption"
                onChange={() => {
                  console.log("In function");
                  setFilter(document.getElementById("FilterOption").value);
                }}
              >
                <option value="Filter" disabled selected>
                  Filter
                </option>
                <option value="Name">By Name</option>
                <option value="City">By City</option>
                <option value="Date">By Date</option>
                <option value="All">All</option>
              </Select>
            </Stack>
            {props.userType == "ADMIN" ? <Button
              leftIcon={<TbLayoutGridAdd />}
              bg="#EB4E62"
              color="white"
              variant="solid"
              margin=" 0% 5%"
              padding="0% 3%"
            >
              Add Theater
            </Button> :  <div></div>}
          </InputGroup>
        </Flex>
      </Box>
    </div>
  );
}

export default Filter;
