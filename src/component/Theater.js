import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  SimpleGrid,
  CardHeader,
  Flex,
  Avatar,
  Box,
  IconButton,
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
  Collapse,
} from "@chakra-ui/react";
import "./Theater.css";
import logo from "../images/Logo.png";
import { useDisclosure } from "@chakra-ui/react";
import UpdateAddress from "./UpdateAddress";
import UpdateSeats from "./UpdateSeats";

// Modal

function Theater() {
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
    <div className="Theaters">
      <Card maxW="lg" align="center" border="1px solid black">
        <CardHeader align="left">
          <Flex spacing="4">
            <Flex flex="1" gap="10" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src={logo} />

              <Box>
                <Heading size="sm">GalaxE Movie Theater</Heading>
                <Text>4DX, Nexus (Formerly Forum), Koramangala</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider orientation="horizontal" width="80%" />
        <CardBody>
          <Text>
            Nexus Mall, 21-22, Adugodi Main Road, Koramangala, Chikku Lakshmaiah
            Layout, Bengaluru, Karnataka 560095, India
          </Text>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "50px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            className="BuyTicket"
            color="white"
            borderRadius="30px"
            margin="0% 5%"
          >
            Buy Tickets
          </Button>
          <Button
            flex="1"
            variant="ghost"
            className="BuyTicket"
            color="white"
            borderRadius="30px"
            width="sm"
            onClick={() => {
              setOverlay(<OverlayTwo />);
              onOpen();
            }}
          >
            Update Theater
          </Button>
        </CardFooter>
      </Card>

      {/* Modal */}
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

export default Theater;
