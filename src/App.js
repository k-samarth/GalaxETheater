import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "./component/Header";
import Theater from "./component/Theater";
import Filter from "./component/Filter";
import Footer from "./component/Footer";

function App() {
  var name = "Samarth";
  var userType = "ADMIN";
  // var userType = "USER";
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
          <Theater userType={userType} />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater userType={userType} />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater userType={userType} />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater userType={userType} />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater userType={userType} />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater userType={userType} />
        </GridItem>
      </Grid>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
