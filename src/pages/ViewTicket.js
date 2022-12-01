import React, { useState, useEffect } from "react";
import AdminFilter from "../component/AdminFilter";
import OrderSummary from "../component/OrderSummary";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import "./ViewTicket.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewTicket() {
 
  return (
    <div className="view_ticket_main_container">
      {/* <Header /> */}
      <div className="view_ticket_main">
        <OrderSummary />
        {/* <AdminFilter/> */}
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default ViewTicket;
