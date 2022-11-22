import React, { useEffect, useState } from "react";
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
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import "./Theater.css";
import UpdateTheater from "./UpdateTheater";
import DeleteTheater from "./DeleteTheater";

// Modal

function Theater(props) {

  return (
    <div className="Theaters">
      <Card maxW="lg" align="center" border="1px solid black">
        <CardHeader align="left">
          <Flex spacing="4">
            <Flex flex="1" gap="10" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src={props.logo} />

              <Box>
                <Heading size="sm">{props.TheaterName}</Heading>
                <Text>{props.TheaterDesc}</Text>
              </Box>
            </Flex>
            <DeleteTheater/>
          </Flex>
        </CardHeader>
        <Divider orientation="horizontal" width="80%" />
        <CardBody>
          <Text>{props.TheaterDetails}</Text>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "50px",
            },
          }}
          gap={2}
        >
          <Button
            flex="1"
            variant="ghost"
            className="BuyTicket"
            bg="#EB4E62"
            color="white"
            borderRadius="30px"
          >
            Buy Tickets
          </Button>

          {props.userType == "ADMIN" ? <UpdateTheater /> : null}
        </CardFooter>
      </Card>

      {/* Modal */}
    </div>
  );
}

export default Theater;
