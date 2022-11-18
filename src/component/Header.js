import React from "react";
import { Box, Img, Wrap, WrapItem, Avatar} from "@chakra-ui/react";
import logo from "../images/Logo.png";
import "./Header.css";

function Header() {
  return (
    <div className="Headers">
      <Box bg="#333545" w="100%" p={4} color="#333545" className="Box">
        <img src={logo} alt="Logo" id="Logo" />
        <div className="navs">
          <div className="movie">
            <div className="movieIcon">
              <img src="https://cdn-icons-png.flaticon.com/512/306/306337.png" />
            </div>
            <h1 className="movieNav">Movies</h1>
          </div>
          <div className="theater">
            <div className="theaterIcon">
              <img src="https://cdn-icons-png.flaticon.com/512/8227/8227326.png" />
            </div>
            <h1 className="theaterNav">Theaters</h1>
          </div>
        </div>
        <div className="user">
          <Wrap>
            <WrapItem>
                <div className="flexer">
              <Avatar
                size="lg"
                name="Dan Abrahmov"
                src="https://miro.medium.com/fit/c/176/176/0*xaub0xwl-9wLTuib.jpg"
              />
              <h1 className="username">Hi, Sam</h1>
                </div>
            </WrapItem>
          </Wrap>
        </div>
      </Box>
    </div>
  );
}

export default Header;
