import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "./component/Header";
import Theater from "./component/Theater";
import Filter from "./component/Filter";
import Footer from "./component/Footer";
import logo from "./images/Logo.png";
import Provider from "./component/Provider";

function App() {
  
  return (
    <div>
      <Provider  user={"ADMIN"}/>
    </div>
  );
}

export default App;
