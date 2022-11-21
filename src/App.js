import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "./component/Header";
import Theater from "./component/Theater";
import Filter from "./component/Filter";
import Footer from "./component/Footer";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Filter/>
      <Grid templateColumns="repeat(2, 1fr)" gap={8} align="center" margin="0% 5%">
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
        <GridItem colSpan={1}>
          <Theater />
        </GridItem>
      </Grid>
    <Footer/>
    </ChakraProvider>
  );
}

export default App;
