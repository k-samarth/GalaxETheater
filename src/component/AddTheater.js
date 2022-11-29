import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import UpdateAddress from "./UpdateAddress";
import UpdateSeats from "./UpdateSeats";
import { TbLayoutGridAdd } from "react-icons/tb";
import AddAddress from "./AddAddress";
import AddSeats from "./AddSeats";

function AddTheater() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [rowAdd, setRowAdd] = useState(1);
  const [code,setcode]=useState("");
    const[name,setname]=useState("");
    const[imgUrl,setimgUrl]=useState("");

const finalsubmit=()=>{
  const details = JSON.parse(localStorage.getItem("Theateraddresses"));
  var row  = JSON.parse(localStorage.getItem("array"));
  const userdata = {
   code: details.code,
    name: details.name,
    imgUrl:details.imgUrl,
    seatingCapacity: 70,
    address: details.address,
    row: row
}
axios.post("http://localhost:9090/theater", userdata)
.then((response) => {
  localStorage.clear();
  alert(response.data);
  window.location.reload();
})

}
   const databasesubmit=()=>{
    onClose();
    finalsubmit();
   }

  const updateAddRow = () => {
    if (rowAdd <= 17 && rowAdd > 0) {
      setRowAdd((prevCount) => prevCount + 1);
      console.log(rowAdd);
    }
  };

  const submitfunction = (e)=>{
    const data={code,name,imgUrl};

    localStorage.setItem("data",JSON.stringify(data));
        e.preventDefault();
      }
  return (
    <div>
      <Button
        leftIcon={<TbLayoutGridAdd />}
        bg="#EB4E62"
        color="white"
        variant="solid"
        margin=" 0% 5%"
        padding="0% 3%"
        width="xs"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        Add Theater
      </Button>

      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="10%"
            backdropBlur="2px"
          />
          <ModalContent backgroundColor="#333545" color="white">
            <ModalHeader>Add Theater</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Theater Code</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Theater Code"
                  type="text"
                  value={code} 
                  onChange={(e)=>{setcode(e.target.value)}}

                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Theater Name</FormLabel>
                <Input placeholder="Theater name" type="text"
                value={name} 
                onChange={(e)=>{setname(e.target.value)}} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder="Image URL" type="text"   value={imgUrl} 
                onChange={(e)=>{setimgUrl(e.target.value)}}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
            
             <AddAddress submitfunction={submitfunction}></AddAddress>
              <AddSeats updateAddRow={updateAddRow} rowAdd={rowAdd}></AddSeats>
              {rowAdd > 15 ? (
                <Button onClick={databasesubmit} colorScheme="cyan" mr={3}>
                  Submit
                </Button>
              ) : null}
              <Button onClick={onClose} colorScheme="blackAlpha">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default AddTheater;
