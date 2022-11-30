import React, { useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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

function UpdateTheater(props) {
  const theatername=props.theatername;
  console.log("shain here"+theatername)
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
      name:theatername,
      imgUrl:details.imgUrl,
      seatingCapacity: 70,
      address: details.address,
      row: row
  }
  axios.put("http://localhost:9090/theater/update", userdata)
  .then((response) => {
      // console.log(response.status);
      // console.log(response);
  
      localStorage.clear();
  
      if (response.data === "Updated Successfully") {
          alert(response.data);
      }
      else {
          alert("Saving failed");
      }
  
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

    const [validateUpdateTheater,setValidateUpadteTheater]=useState(false);
    const ValiditeUpdateTheater=()=>{
      var regexforCode = /^[A-Z]{2}[0-9]{2}$/;
      var regexforimgUrl=/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
        
      if(code==""||imgUrl==""){
        alert("Please Enter all the fields")
      }
      else if(!regexforCode.test(code)){
        alert("Please Enter the code correctly")
      }
    
    else if(!regexforimgUrl.test(imgUrl)){
      alert("Enter the valid imgUrl")
    }
     
      else{
        
        setValidateUpadteTheater(true)
        console.log("inside the else block"+validateUpdateTheater)
      }
    }
     const submitfunction = ()=>{
       
      ValiditeUpdateTheater()
      const data={code,theatername,imgUrl};
  
      localStorage.setItem("data",JSON.stringify(data));
         
        }

  return (
    <div>
      <Button
        variant="outline"
        className="BuyTicket"
        color="white"
        borderRadius="30px"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        Update Theater
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
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent backgroundColor="#333545" color="white">
            <ModalHeader>Update Theater</ModalHeader>
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
                value={props.theatername} 
                onChange={(e)=>{setname(props.theatername)}} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder="Image URL" type="text" value={imgUrl} 
                onChange={(e)=>{setimgUrl(e.target.value)}}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <UpdateAddress submitfunction={submitfunction}  validateUpdateTheater1={validateUpdateTheater} theatername={theatername}></UpdateAddress>
              <UpdateSeats 
                updateAddRow={updateAddRow}
                rowAdd={rowAdd}
              ></UpdateSeats>
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

export default UpdateTheater;
