import React from "react";
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
  const { isOpen1, onToggle } = useDisclosure();
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
            backdropInvert="80%"
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
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Theater Name</FormLabel>
                <Input placeholder="Theater name" type="text" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder="Image URL" type="text" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <AddAddress></AddAddress>
              <AddSeats></AddSeats>
              <Button onClick={onClose} colorScheme="cyan" mr={3}>
                Submit
              </Button>
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
