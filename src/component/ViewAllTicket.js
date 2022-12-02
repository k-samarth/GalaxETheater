import React from "react";
import { useState, useEffect } from "react";
import "./ViewAllTicket.css";
import Logo from "../images/Logo.png";
import axios from "axios";

const ViewAllTicket = () => {
  const [Ticket, setTicket] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9091/movie/movieStatus").then((response) => {
      setTicket(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="container">
      {Ticket.map((data) => {
        return (
          <div className="mainticket">
            {/* {console.log(data)} */}

            <div className="ticketcard">
              <img src={`${data.url}`}></img>

              <div className="ticketdetails">
                <div className="moviename">
                  {data.name}
                  {/* {console.log(data.name)} */}
                </div>
                <div className="moviegenre">{data.genre}</div>
                <div className="movieduration">{data.duration}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAllTicket;
