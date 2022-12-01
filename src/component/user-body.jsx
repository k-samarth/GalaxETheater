import axios from "axios";
import { useState, useEffect } from "react";
import "./user-body.css";
import ViewConfirmBookingDetails from "../pages/ViewConfirmBookingDetails";
let imageUrl =
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1652696821976_728x100.png";
let categories = ["All", "Popcorn", "Snacks", "Drinks", "Combos"];

let demoImageUrl =
  "https://th.bing.com/th/id/R.8cb86f6efd4f3b632b77daa06c369205?rik=3X%2bZfn99yejiRw&riu=http%3a%2f%2fprintmeposter.com%2fblog%2fwp-content%2fuploads%2f2016%2f09%2fA-Creative-Food-Poster-for-Kitchen.jpg&ehk=V0OONQwhJ%2fWinRE6Cbk0YONWkMc32EPuUPSrJRJxYfQ%3d&risl=&pid=ImgRaw&r=0";

/////////////////////////////////////////////// Billing configuration//////////

let convenienceFeesPercentage = 0.16;
let IGSTPercentage = 0.18;
const ticketBookingSummary = {
  seatType: "balcony",
  totalTickets: 3,
  seats: ["C1", "C2", "C3"],
  theatre: "Anjan multiplex 4k",
  screen: "2",
  basicFare: 150,
};

let currentCategory = "All";
let previousCategory;

const UserBody = () => {
  const [foodItemsList, setFoodItemsList] = useState([]);
  const [renderer, setRenderer] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:2122/all")
      .then(
        (Response) => setFoodItemsList(Response.data),
        setRenderer(!renderer)
      );
  }, []);
  useEffect(() => {
    handleCategorySelectedEvent(currentCategory);
    setRenderer(!renderer);
  }, [foodItemsList]);

  let totalTicketPrice =
    parseFloat(ticketBookingSummary.basicFare) *
    parseFloat(ticketBookingSummary.totalTickets);
  let baseAmount = totalTicketPrice * convenienceFeesPercentage;
  let IGSTFee = baseAmount * IGSTPercentage;
  let totalConvenienceFee = baseAmount + IGSTFee;
  let [totalAddonsCost, setTotalAddonsCost] = useState(0);
  let [totalDiscount, setTotalDiscount] = useState(0);

  const [currentFoodIemsList, setCurrentFoodItemsList] =
    useState(foodItemsList);
  const [addedFoodItems, setAddedFoodItems] = useState({});

  useEffect(() => {
    const obj = document.getElementById(currentCategory);
    obj.style.backgroundColor = "#181E40";
    obj.style.color = "#ffff";
    const prevObj = document.getElementById(previousCategory);
    if (prevObj) {
      prevObj.style.backgroundColor = "rgb(234, 234, 234)";
      prevObj.style.color = "#181E40";
    }
  }, [currentCategory]);

  useEffect(() => {
    let tempTotal = 0;
    for (const key in addedFoodItems) {
      tempTotal +=
        currentFoodIemsList.find((item) => item.id == key).offerPrice *
        addedFoodItems[key];
    }
    setTotalAddonsCost(tempTotal);
  }, [addedFoodItems]);

  const handleFoodItemAddEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      temp[id]++;
      setAddedFoodItems(temp);
    } else {
      temp[id] = 1;
      setAddedFoodItems(temp);
    }
  };
  const handleFoodItemDecrementEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      if (temp[id] > 0) temp[id]--;
      setAddedFoodItems(temp);
    }
  };
  const handleFoodItemRemoveEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      delete temp[id];
      setAddedFoodItems(temp);
    }
  };

  const handleCategorySelectedEvent = (category) => {
    if (currentCategory != category) {
      previousCategory = currentCategory;
      currentCategory = category;
    }
    if (category === "All") setCurrentFoodItemsList(foodItemsList);
    else {
      setCurrentFoodItemsList(
        foodItemsList.filter((item) => item.category == category)
      );
    }
  };

  const handleSortEvent = (property) => {
    console.log(property);
    switch (property) {
      case "name:a-z": {
        let temp = foodItemsList;
        temp.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa < fb) return -1;
          if (fa > fb) return 1;
          return 0;
        });
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        break;
      }
      case "name:z-a": {
        let temp = foodItemsList;

        temp.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa > fb) return -1;
          if (fa < fb) return 1;
          return 0;
        });
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        break;
      }
      case "price:low to high": {
        let temp = foodItemsList;
        temp.sort((a, b) => a.offerPrice - b.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        break;
      }
      case "price:high to low": {
        let temp = foodItemsList;
        temp.sort((a, b) => b.offerPrice - a.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        break;
      }
    }
  };

  return (
    <>
      <div className="bodymainuser">
        {/* ------------------------------Body left start here-------------------- */}
        <div className="body-leftuser">
          {/* ----------------------------Ad-Image display-------------------------- */}
          <div className="adcard-display">
            <a href="#" title="click to get offer">
              <img className="ad-image" src={imageUrl} alt="ad-image" />
            </a>
          </div>
          {/* ----------------------------End od Ad-Image display-------------------------- */}
          {/* ----------------------------Title Bar grab a bite-------------------------- */}

          {/* ----------------------------Category list start-------------------------- */}
          <div className="food-category">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={(e) => handleCategorySelectedEvent(e.target.id)}
                    key={category}
                    id={category}
                    title={`click here to display ${category} items`}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li className="sortinguser">
                <label htmlFor="select-sorting" style={{ fontWeight: "600" }}>
                  Sort By:{" "}
                </label>
                <select
                  name="sorting"
                  id="select-sorting"
                  onChange={(e) => handleSortEvent(e.target.value)}
                >
                  <option value="default" hidden={true} defaultValue={true}>
                    Default
                  </option>
                  <option value="name:a-z">Name: A-Z</option>
                  <option value="name:z-a">Name: Z-A</option>
                  <option value="price:low to high">PRICE: LOW TO HIGH</option>
                  <option value="price:high to low">PRICE: HIGH TO LOW</option>
                </select>
              </li>
            </ul>
          </div>
          {/* ----------------------------End of Category list start-------------------------- */}
          {/* ----------------------------Food items dynamic display starts here-------------------------- */}
          <div className="food-item-display">
            <div className="food-items">
              {currentFoodIemsList.length <= 0 ? (
                <div style={{ textAlign: "center", color: "red" }}>
                  <h6>Currently Unavailable! Please try again later.</h6>
                </div>
              ) : (
                currentFoodIemsList.map((item) => (
                  <div className="container" id="container" key={item.id}>
                    <div className="itemImage">
                      <img src={item.itemImageUrl} alt="Image of food item" />
                      <hr />
                    </div>
                    <div className="detailsuser">
                      <div className="title-description">
                        <p className="food-item-title">{item.name}</p>
                        <p className="food-item-description">
                          {item.description}
                        </p>
                      </div>
                      <div className="food-item-button-container ">
                        <div className="actualprice price">
                          <del style={{ color: "red" }}>
                            {item.actualPrice}/-
                          </del>
                        </div>
                        <div className="offerprice price">
                          <b>{item.offerPrice}/-</b>
                        </div>
                        <div className="button-container" id="bc">
                          <button
                            className="btn btn-primary btn-sm  item-btn add"
                            value={item.id}
                            onClick={(e) =>
                              handleFoodItemAddEvent(e.target.value)
                            }
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="discountline">
                      <small>
                        save upto{" "}
                        {parseInt(
                          ((parseFloat(item.actualPrice) -
                            parseFloat(item.offerPrice)) /
                            parseFloat(item.actualPrice)) *
                            100
                        )}
                        %
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* ----------------------------End of Food items dynamic display-------------------------- */}
        </div>

        {/* ------------------------------Body rightside part start-------------------- */}
        <ViewConfirmBookingDetails></ViewConfirmBookingDetails>
        {/* <div className="body-rightuser">
          <div className="body-right-titleuser">
            <p>ORDER SUMMAARY</p>
          </div>
          <br />
          <div className="ticket-details">
            <div className="ticket-price" id="ticket-price">
              <p>
                {ticketBookingSummary.seatType.toUpperCase()}
                {" - "}
                {ticketBookingSummary.seats.toString()}
                <small>{` (${ticketBookingSummary.totalTickets} Tickets)`}</small>
              </p>
              <p className="amount-display-new">
                Rs.{totalTicketPrice.toFixed(2)}
              </p>
            </div>
            <div className="theatrename-display">
              <p>{ticketBookingSummary.theatre}</p>
            </div>
            <br />
            <div className="convenience-fee-new">
              <p className="convenience-fee-text-new">{" Convenience fees"}</p>
              <p className="amount-display-new">
                Rs.{totalConvenienceFee.toFixed(2)}
              </p>
              <p
                className="sub-convenience-fee conv-fee-text "
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              >
                {"Base Amount"}
              </p>
              <p
                className="sub-convenience-fee amount-display-new"
                style={{ marginTop: "1rem" }}
              >{`Rs. ${baseAmount.toFixed(2)} `}</p>
              <p
                className="sub-convenience-fee conv-fee-text-new "
                style={{ marginTop: "0.3rem", marginLeft: "2rem" }}
              >{`Integrated GST (IGST) @ ${IGSTPercentage * 100}% `}</p>
              <p
                className="sub-convenience-fee amount-display-new"
                style={{ marginTop: "0.3rem" }}
              >{`Rs. ${IGSTFee.toFixed(2)} `}</p>
            </div>
          </div>
          <br />
          <br />
          <hr />
          <br />
          <div className="subtotal">
            <span className="subtotal-title">{"Subtotal"}</span>
            <span className="subtotal-amount">
              Rs.{totalTicketPrice + totalConvenienceFee}
            </span>
          </div>
          <div className="addons-title">
            <span>Food and Beverages</span>
            <span className="addons-title-price">Rs.{totalAddonsCost}</span>
          </div>

          <div className="addons">
            <ul className="addons-ul">
              {Object.keys(addedFoodItems).map((id) => (
                <li key={id}>
                  <button
                    className="button rm-btn"
                    value={id}
                    onClick={(e) => handleFoodItemRemoveEvent(e.target.value)}
                  >
                    X
                  </button>
                  <span>
                    {foodItemsList.filter((item) => item.id == id)[0].name}
                  </span>
                  <button
                    className="button inc-btn"
                    value={id}
                    onClick={(e) => handleFoodItemAddEvent(e.target.value)}
                  >
                    {"+"}
                  </button>
                  <button
                    className="button dec-btn"
                    value={id}
                    onClick={(e) =>
                      handleFoodItemDecrementEvent(e.target.value)
                    }
                  >
                    {"-"}
                  </button>
                  <span className="quantity">
                    {addedFoodItems[id]}
                    {"   "}
                  </span>
                  <span className="item-total-price">
                    Rs.
                    {foodItemsList.filter((item) => item.id == id)[0]
                      .offerPrice * addedFoodItems[id]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="body-right-footer">
            <div className="pay-btn-div">
              <button>
                Amount payable Rs.
                {totalAddonsCost + totalConvenienceFee + totalTicketPrice}
              </button>
            </div>
          </div>
        </div> */}
        {/* ------------------------------End of Body rightside part start-------------------- */}
      </div>
    </>
  );
};

export default UserBody;
