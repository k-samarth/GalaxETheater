import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  CardHeader,
  Flex,
  Avatar,
  Box,
  GridItem,
} from "@chakra-ui/react";
import {
  Grid,
} from "@chakra-ui/react";
import "./Theater.css";
import logo from "../images/Logo.png";
import UpdateTheater from "./UpdateTheater";

// Modal

function Theater(props) {
  

  

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
          <Grid templateColumns="repeat(5, 1fr)" gap={4} justifyContent="center">
            <GridItem colSpan={2} h="10">
              <Button
                flex="1"
                variant="ghost"
                className="BuyTicket"
                color="white"
                borderRadius="30px"
              >
                Buy Tickets
              </Button>
            </GridItem>
            {props.userType == "ADMIN" ?
            <GridItem colStart={4} colEnd={6} h="10">
              <UpdateTheater/>
            </GridItem>: null}
          </Grid>
        </CardFooter>
      </Card>

      {/* Modal */}
      
    </div>
  );
}

export default Theater;
