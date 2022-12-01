// import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import "./ViewConfirmBookingDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const [APIData, setAPIData] = useState([]);
  const [BookingData, setBookingData] = useState([[]]);
  const [TheaterData, setTheaterData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9091/seat`).then((response) => {
      setAPIData(response.data);
    });
    // axios.get(`http://localhost:9091/booking`).then((response) => {
    //   setBookingData(response.data);
    // });
    axios.get(`http://localhost:9091/theatre`).then((response) => {
      setTheaterData(response.data);
    });
  }, []);
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMoviePrice = JSON.parse(
    localStorage.getItem("selectedMoviePrice")
  );
  // console.log(selectedMoviePrice);
  // selectedSeats.map((i) => console.log(i));

  function postTicket() {
    console.log(APIData);
    console.log(BookingData);
    // console.log(BookingData.seats);
    // console.log(BookingData.seats[0]);
    // console.log(BookingData.seats[1]);
    axios.post(`http://localhost:9091/booking/`, {
      code: "A",
      name: "A",
      seats: APIData,
      totalPrice: APIData.length * APIData[0].price,
    });
  }

  let premiumCost = 300;
  let goldCost = 200;
  let normalCost = 100;

  return (
    <div className="container_main">
      {/* {APIData.map((data) => { */}
      {/* return ( */}
      <div className="main">
        {/* <div className="main" key={data.id}> */}
        <div className="main1">
          <div className="booking">BOOKING SUMMARY</div>

          <div className="summary">
            <div className="summary1">
              <span className="seat">
                {APIData.filter((data) => data.rowId < 2).map(
                  (data) => data.rowId
                ).length > 0
                  ? "PREMIUM: " +
                    APIData.filter((data) => data.rowId < 2).map(
                      (data) => `${data.name}`
                    )
                  : ""}
                {APIData.filter(
                  (data) => data.rowId >= 2 && data.rowId < 5
                ).map((data) => data.rowId).length > 0
                  ? "GOLD: " +
                    APIData.filter(
                      (data) => data.rowId >= 2 && data.rowId < 5
                    ).map((data) => `${data.name}`)
                  : ""}
                {APIData.filter((data) => data.rowId >= 5).map(
                  (data) => data.rowId
                ).length > 0
                  ? "SILVER: " +
                    APIData.filter((data) => data.rowId >= 5).map(
                      (data) => `${data.name}`
                    )
                  : ""}
                <div className="ticketqty">( {APIData.length} Tickets )</div>
                <span className="ticketprice">
                  Rs.
                  {APIData.filter((data) => data.rowId < 2)
                    .map((data) => data.price)
                    .reduce((a, c) => a + c, 0) +
                    APIData.filter((data) => data.rowId >= 2 && data.rowId < 5)
                      .map((data) => data.price)
                      .reduce((a, c) => a + c, 0) +
                    APIData.filter((data) => data.rowId >= 5)
                      .map((data) => data.price)
                      .reduce((a, c) => a + c, 0)}
                </span>
                <span className="theatername">{TheaterData[0]?.name}</span>
              </span>

              <div className="convenience">
                Convenience fees
                <span className="conveniencefee">
                  Rs.
                  {(
                    APIData.length * 100 * 0.25 +
                    APIData.length * 100 * 0.28
                  ).toFixed(1)}
                </span>
                <div className="base">
                  <span className="base1">Base Amount</span>
                  <span className="base2">
                    Rs. {(APIData.length * 100 * 0.25).toFixed(1)}
                  </span>
                </div>
                <div className="gst">
                  <span className="gst1">Integrated GST (IGST) @ 18%</span>
                  <span className="gst2">
                    Rs. {(APIData.length * 100 * 0.18).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="sub">
              <span className="subtotal">
                Sub total
                <span className="subtotalprice">
                  Rs.
                  {APIData.length * 100 * 0.25 +
                    APIData.length * 100 * 0.18 +
                    APIData.filter((data) => data.rowId < 2)
                      .map((data) => data.price)
                      .reduce((a, c) => a + c, 0) +
                    APIData.filter((data) => data.rowId >= 2 && data.rowId < 5)
                      .map((data) => data.price)
                      .reduce((a, c) => a + c, 0) +
                    APIData.filter((data) => data.rowId >= 5)
                      .map((data) => data.price)
                      .reduce((a, c) => a + c, 0)}
                </span>
              </span>
            </div>
          </div>

          <div className="amount-btn">
            <div className="pay">
              <span className="amount">Amount Payable</span>
            </div>

            <div>
              <span className="amountprice">
                {" "}
                Rs.{" "}
                {APIData.length * 100 * 0.25 +
                  APIData.length * 100 * 0.18 +
                  APIData.filter((data) => data.rowId < 2)
                    .map((data) => data.price)
                    .reduce((a, c) => a + c, 0) +
                  APIData.filter((data) => data.rowId >= 2 && data.rowId < 5)
                    .map((data) => data.price)
                    .reduce((a, c) => a + c, 0) +
                  APIData.filter((data) => data.rowId >= 5)
                    .map((data) => data.price)
                    .reduce((a, c) => a + c, 0) +
                  2}
              </span>
            </div>
          </div>

          <div className="note">
            By proceeding, I express my consent to complete this transaction.
          </div>

          <Link to="../ViewTicket">
            <button type="button" className="buttonClass" onClick={postTicket}>
              Proceed
            </button>
          </Link>
        </div>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

export default Ticket;
