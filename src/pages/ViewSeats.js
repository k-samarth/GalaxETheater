import React, { useState, useEffect } from "react";
import "./ViewSeats.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewSeats() {
  const [APIData, setAPIData] = useState([]);
  // Get The Seat API
  useEffect(() => {
    axios.get(`http://localhost:9091/seat`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  // Post What Gets Selected
  function postSeat() {
    axios.post(`http://localhost:9091/seat/saveSeat`, APIData);
  }

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMoviePrice = JSON.parse(
    localStorage.getItem("selectedMoviePrice")
  );

  let number = 10;
  let seats = [];
  for (let i = 0; i < number; i++) {
    seats.push(
      <div class="row">
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
      </div>
    );
  }
  function selecting() {
    const moviecontainer = document.querySelector(".moviecontainer");
    const seats = document.querySelectorAll(".row .seat:not(.sold)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const movieSelect = document.getElementById("movie");

    populateUI();

    // let ticketPrice = +movieSelect.value;

    // Save selected movie index and price
    function setMovieData(movieIndex, moviePrice) {
      localStorage.setItem("selectedMovieIndex", movieIndex);
      localStorage.setItem("selectedMoviePrice", moviePrice);
    }

    // Update total and count
    function updateSelectedCount() {
      const selectedSeats = document.querySelectorAll(".row .seat.selected");

      const seatsIndex = [...selectedSeats].map((seat, index) => {
        console.log(index);
        return [...seats].indexOf(seat);
      });

      localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

      const selectedSeatsCount = selectedSeats.length;

      count.innerText = selectedSeatsCount;
      //   total.innerText = selectedSeatsCount * ticketPrice;

      setMovieData(movieSelect.selectedIndex, movieSelect.value);
    }

    // Get data from localstorage and populate UI
    function populateUI() {
      const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            console.log(seat.classList.add("selected"));
          }
        });
      }

      const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        console.log(selectedMovieIndex);
      }
    }
    console.log(populateUI());
    // Movie select event
    if (movieSelect) {
      movieSelect.addEventListener("change", (e) => {
        //   ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
      });
    }

    // Seat click event
    if (moviecontainer) {
      moviecontainer.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("seat") &&
          !e.target.classList.contains("sold")
        ) {
          e.target.classList.toggle("selected");

          updateSelectedCount();
        }
      });
    }

    // Initial count and total set
    updateSelectedCount();
  }
  return (
    <div className="movie_main_container">
      {/* <div className="movie-container">
        <label> Select a movie:</label>
        <select id="movie">
          <option value="220">Black Panther (RS.220)</option>
          <option value="320">Radhe (RS.320)</option>
          <option value="250">RRR (RS.250)</option>
          <option value="260">F9 (RS.260)</option>
        </select>
      </div> */}

      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div class="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div class="seat sold"></div>
          <small>Sold</small>
        </li>
      </ul>
      <div class="moviecontainer">
        <div class="screen"></div>
        {seats.map((i) => i)}
      </div>

      <p class="text">
        You have selected <span id="count">0</span> seat
        {/* You have selected <span id="count">0</span> seat for a price of RS. */}
        {/* <span id="total">0</span> */}
      </p>
      <Link to="../Usermenu">
        <button type="button" className="proceedButton">
          {/* <button type="button" className="proceedButton" onClick={postSeat}> */}
          Proceed
        </button>
      </Link>
    </div>
  );
}

export default ViewSeats;
