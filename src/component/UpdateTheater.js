import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
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

function UpdateTheater() {
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
        flex="1"
        variant="ghost"
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
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Theater Name</FormLabel>
                <Input placeholder="Theater name" type="text" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Seating Capacity</FormLabel>
                <Input placeholder="Seating Capacity" type="number" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Rows</FormLabel>
                <Input placeholder="rows" type="number" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <UpdateAddress></UpdateAddress>
              <UpdateSeats></UpdateSeats>
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

export default UpdateTheater
