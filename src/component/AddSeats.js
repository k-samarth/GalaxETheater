import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import "./SeatStyles.css";

function AddSeats() {
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

  const [count1, setCount1] = useState(6);

  const [plusdisabled, setPlusDisabled] = useState(false);
  const [minusdisabled, setMinusDisabled] = useState(false);

  const handleClick = () => {
    setCount1(6);
  };
  const minusbuttonfunction = () => {
    if (count1 === 6) {
      minusdisabled(true);
    } else {
      setCount1(count1 - 1);
    }
  };
  const plusbuttonfunction = () => {
    if (count1 === 10) {
      plusdisabled(true);
    } else {
      setCount1(count1 + 1);
    }
  };

  return (
    <div>
      <Button onClick={onOpen} colorScheme="blue" mr={3}>
        Add Rows
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <Box>
          <ModalContent backgroundColor="#333545" color="white">
            <ModalHeader>Add Rows</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <div id="rows">
                {" "}
                <span> Rows</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Columns</span>
              </div>
              <div className="container-holder">
                <div className="container">
                  <div className="privilage">
                    <div className="privilage_names">
                      <p>PREMIUM</p>
                    </div>
                    <div className="buttons">
                      <span id="count">6</span>
                    </div>
                  </div>
                  <div className="privilage">
                    <div className="privilage_names">
                      <p>EXECUTIVE</p>
                    </div>
                    <div className="buttons1">
                      <span id="count">6</span>
                    </div>
                  </div>
                  <div className="privilage">
                    <div className="privilage_names">
                      <p>NORMAL</p>
                    </div>
                    <div className="buttons2">
                      <span id="count">6</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="container">
                    <div className="privilage">
                      <div className="buttonss">
                        <button
                          id="plusandminusb"
                          onClick={plusbuttonfunction}
                          disabled={plusdisabled}
                        >
                          +
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span id="count">{count1}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          disabled={minusdisabled}
                          id="plusandminusb"
                          onClick={minusbuttonfunction}
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div className="privilage">
                      <div className="buttons1_1">
                        <button
                          id="plusandminusb"
                          onClick={plusbuttonfunction}
                          disabled={plusdisabled}
                        >
                          +
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span id="count">{count1}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          disabled={minusdisabled}
                          id="plusandminusb"
                          onClick={minusbuttonfunction}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="privilage">
                      <div className="buttons2_1">
                        <button
                          id="plusandminusb"
                          onClick={plusbuttonfunction}
                          disabled={plusdisabled}
                        >
                          +
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span id="count">{count1}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          disabled={minusdisabled}
                          id="plusandminusb"
                          onClick={minusbuttonfunction}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>{" "}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} colorScheme="blue" mr={3}>
                Submit
              </Button>
              <Button onClick={handleClick} colorScheme="blue" mr={3}>
                RESET
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </div>
  );
}

export default AddSeats;
