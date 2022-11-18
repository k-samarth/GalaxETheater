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
} from "@chakra-ui/react";
import "./Theater.css";
import logo from "../images/Logo.png";
function Theater() {
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
          {/* <Button
            flex="1"
            variant="ghost"
            className="BuyTicket"
            color="white"
            borderRadius="30px"
          >
            Buy Tickets
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Theater;
