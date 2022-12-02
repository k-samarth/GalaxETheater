import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "./component/Header";
import Theater from "./component/Theater";
import Filter from "./component/Filter";
import Footer from "./component/Footer";
import logo from "./images/Logo.png";
import Provider from "./component/Provider";
import ViewTicket from "./pages/ViewTicket";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewSeats from "./pages/ViewSeats";
import UserMenu from "./component/user-menu";
import AdminMenu from "./component/admin-menu";
import ViewConfirmBookingDetails from "./pages/ViewConfirmBookingDetails";
import AdminFilterViewAllTicket from "./pages/AdminFilterViewAllTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ViewSeats />} />
        <Route exact path="/ViewTicket" element={<ViewTicket />} />
        <Route
          exact
          path="/ViewConfirmBookingDetails"
          element={<ViewConfirmBookingDetails />}
        />
        <Route
          exact
          path="/AdminFilterViewAllTicket"
          element={<AdminFilterViewAllTicket />}
        />
        <Route path="/Usermenu" element={<UserMenu />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/theater" element={<Provider admin={"ADMIN"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
