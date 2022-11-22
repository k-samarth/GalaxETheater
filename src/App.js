import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "./component/Header";
import Theater from "./component/Theater";
import Filter from "./component/Filter";
import Footer from "./component/Footer";
import logo from "./images/Logo.png";

function App() {
  var name = "Samarth";
  var userType = "ADMIN";
  // var userType = "USER";
  var TheaterName = "GalaxE Movie Theater";
  var TheaterDesc = "4DX, Nexus (Formerly Forum), Koramangala";
  var TheaterDetails = "Nexus Mall, 21-22, Adugodi Main Road, Koramangala, Chikku Lakshmaiah Layout, Bengaluru, Karnataka 560095, India";


  return (
    <ChakraProvider>
      <Header name={name} />
      <Filter userType={userType} />
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={8}
        align="center"
        margin="0% 5%"
      >
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={TheaterName}
            TheaterDesc={TheaterDesc}
            TheaterDetails={TheaterDetails}
            logo={logo}
          />
        </GridItem>
      </Grid>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
