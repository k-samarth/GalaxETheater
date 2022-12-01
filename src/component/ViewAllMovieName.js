import React from "react";
import { useState, useEffect } from "react";
// import "./ViewAllMovieName.css";
import "./ViewAllTicket.css";
import Logo from "../images/logo.png";
import axios from "axios";

const ViewAllMovieName = ({ moviename }) => {
  const [Ticket, setTicket] = useState([]);
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9091/movie/movieName/${moviename}`)
      .then((response) => {
        setTicket(response.data);
        console.log(response);
        if (response.status !== 200) {
          document.getElementById("error").innerHTML = response.data;
          //   alert(response.data);
          setShowContainer(false);  
        } else {
          setShowContainer(true);
          //   <ViewAllMovieName moviename={userData.moviename} />;
          //   alert("Login Successful!");
        }
      });
  }, []);

  return showContainer ? (
    <div className="container">
      <div className="mainticket">
        <div className="ticketcard">
          <img src={`${Ticket.url}`}></img>

          <div className="ticketdetails">
            <div className="moviename">{Ticket.name}</div>
            <div className="moviegenre">{Ticket.genre}</div>
            <div className="movieduration">{Ticket.duration}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p id="error"></p>
  );
};

export default ViewAllMovieName;
