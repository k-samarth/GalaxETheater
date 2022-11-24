import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "../component/Header";
import Theater from "../component/Theater";
import Filter from "../component/Filter";
import Footer from "../component/Footer";
import logo from "../images/Logo.png";
import React from "react";
import {useEffect} from "react";
import axios from "axios";
import { useState } from "react";

function Provider() {
    var name = "Samarth";
    var userType = "ADMIN";
    // var userType = "USER";
    var TheaterName = "GalaxE Movie Theater";
    var TheaterDesc = "4DX, Nexus (Formerly Forum), Koramangala";
    var TheaterDetails =
      "Nexus Mall, 21-22, Adugodi Main Road, Koramangala, Chikku Lakshmaiah Layout, Bengaluru, Karnataka 560095, India";
      const [APIdata,setAPIdata] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:9090/theatre")
        .then((Response)=> {setAPIdata(Response.data);
        });
      },[]);

     

  return (
<>
<ChakraProvider>
<Header name={name} />
      <Filter userType={userType} />
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={8}
        align="center"
        margin="0% 5%"
      >
    {APIdata.map((data)=>{
      return(
        <div>
       
      
      
        <GridItem colSpan={1}>
          <Theater
            userType={userType}
            TheaterName={data.name}
            TheaterDesc={data.address.addressLine1}
            TheaterDetails={data.address.addressLine1+" "+data.address.addressLine2+" "+data.address.city+" "+data.address.state+" "+data.address.country+" "+data.address.pincode}
            logo={data.imgUrl}
          />
        </GridItem>
        
      
    </div>
    
  );
}
 ) }
 </Grid>
      <Footer />
   
 </ChakraProvider>
 </>
  )}

   

export default Provider;
