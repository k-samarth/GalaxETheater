import axios from "axios";
import { useState, useEffect } from "react";
import "./admin-body.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let imageUrl =
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1652696821976_728x100.png";
let categories = ["All", "Popcorn", "Snacks", "Drinks", "Combos"];

let convenienceFeesPercentage = 0.2;
let IGSTPercentage = 0.25;
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

const AdminBody = () => {
  let [foodItemsList, setFoodItemsList] = useState([]);
  let currentDeletingItemId;
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

  // useEffect( ()=>{
  //     handleCategorySelectedEvent(currentCategory)
  //     setRenderer(!renderer)
  // },[foodItemsList])

  let [currentEditItemId, setCurrentEditItemId] = useState(0);
  let totalTicketPrice =
    parseFloat(ticketBookingSummary.basicFare) *
    parseFloat(ticketBookingSummary.totalTickets);
  let baseAmount = totalTicketPrice * convenienceFeesPercentage;
  let IGSTFee = baseAmount * IGSTPercentage;
  let totalConvenienceFee = baseAmount + IGSTFee;
  let [totalAddonsCost, setTotalAddonsCost] = useState(0);
  // let [totalDiscount, setTotalDiscount] = useState(0);
  let tempFoodItemObj = {
    code: "",
    name: "",
    description: "",
    category: "",
    actualPrice: "",
    offerPrice: "",
    quantityAvailable: "",
    itemImageUrl: "",
  };
  let [tempFoodItemDisplayObj, setTempFoodItemDisplayObj] = useState({
    code: "",
    name: "",
    description: "",
    category: "",
    actualPrice: "",
    offerPrice: "",
    quantityAvailable: "",
    itemImageUrl: "",
  });
  const [currentFoodIemsList, setCurrentFoodItemsList] =
    useState(foodItemsList);
  const [addedFoodItems, setAddedFoodItems] = useState({});
  const [popupFlag, setPopupFlag] = useState(false);
  const [itemCodeWarning, setItemCodeWarning] = useState("");
  const [actualPriceError, setActualPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  if (popupFlag) {
    if (document.getElementById("form-popup"))
      document.getElementById("form-popup").style.display = "flex";
  } else {
    if (document.getElementById("form-popup"))
      document.getElementById("form-popup").style.display = "none";
  }
  const toggleFormPopup = () => {
    setPopupFlag(!popupFlag);
  };

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

  const handleView = (id) => {
    const obj = document.getElementById(id);
    if (obj.style.display == "flex") obj.style.display = "none";
    else obj.style.display = "flex";
  };

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

  const handleItemCodeValidation = (code) => {
    const temp = foodItemsList.filter((item) => item.code == code);
    if (temp.length) setItemCodeWarning("*Item code already exists!");
    else setItemCodeWarning("");
  };

  const handleSaveNewFoodItemEvent = (e) => {
    toggleFormPopup();
    e.preventDefault();

    console.log(tempFoodItemObj.category);
    foodItemsList.push(tempFoodItemObj);
    axios
      .post("http://localhost:2122", tempFoodItemObj)
      .then((Response) => console.log(Response.data));

    handleCategorySelectedEvent(currentCategory);
  };

  const validation = (e) => {
    tempFoodItemObj.code = document
      .getElementById("input-code")
      .value.toUpperCase();
    tempFoodItemObj.actualPrice =
      document.getElementById("input-actualprice").value;

    tempFoodItemObj.offerPrice =
      document.getElementById("input-offerprice").value;
    tempFoodItemObj.description =
      document.getElementById("input-description").value;
    tempFoodItemObj.quantityAvailable =
      document.getElementById("input-quantity").value;

    tempFoodItemObj.itemImageUrl =
      document.getElementById("input-imageurl").value;
    tempFoodItemObj.category = document.getElementById("input-category").value;

    if (tempFoodItemObj.actualPrice <= 0) {
      e.preventDefault();
      console.log(tempFoodItemObj);
      setActualPriceError("Price Can't be Negative or Zero");
    } else if (tempFoodItemObj.offerPrice <= 0) {
      e.preventDefault();
      console.log(tempFoodItemObj);
      setActualPriceError("Price Can't be Negative or Zero");
    } else if (tempFoodItemObj.quantityAvailable <= 0) {
      e.preventDefault();
      console.log(tempFoodItemObj);
      setQuantityError("At Least one quantity must be available");
    } else {
      e.preventDefault();
      handleSaveNewFoodItemEvent(e);
    }
  };
  const handleFoodItemEditEvent = (itemId) => {
    setCurrentEditItemId(itemId);
    console.log("New food item edit event is called.for " + itemId);
    setTempFoodItemDisplayObj({
      ...foodItemsList.filter((item) => item.id == itemId)[0],
    });
    console.log(tempFoodItemObj);
    handleView("edit-popup-bg");
  };

  const editAttribute = (attribute, value) => {
    console.log(value);
    if (value) tempFoodItemObj[attribute] = value;
  };

  const editItem = () => {
    const temp = {
      ...foodItemsList.filter((item) => item.id == currentEditItemId)[0],
    };
    for (const key in temp) {
      if (tempFoodItemObj[key] == "" || tempFoodItemObj[key] == null)
        tempFoodItemObj[key] = temp[key];
    }
    foodItemsList = foodItemsList.filter(
      (item) => item.id != currentEditItemId
    );
    foodItemsList = [...foodItemsList, tempFoodItemObj];
    console.log(foodItemsList);
    axios
      .put(`http://localhost:2122/update/item`, tempFoodItemObj)
      .then((response) => console.log(response.data));
    handleCategorySelectedEvent(currentCategory);
    handleView("edit-popup-bg");
  };

  const handleFoodItemDeleteEvent = (itemId) => {
    console.log("New food item delete event is called. for " + itemId);
    currentDeletingItemId = itemId;
    handleView("delete-popup");
  };

  const deleteItem = () => {
    axios.delete(`http://localhost:2122/delete/${currentDeletingItemId}`);
    console.log("Item deleted...");
    handleFoodItemRemoveEvent(currentDeletingItemId);
    foodItemsList = foodItemsList.filter(
      (item) => item.id != currentDeletingItemId
    );
    handleCategorySelectedEvent(currentCategory);
    handleView("delete-popup");
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
        setRenderer(!renderer);
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
        setRenderer(!renderer);
        break;
      }
      case "price:low to high": {
        let temp = foodItemsList;
        temp.sort((a, b) => a.offerPrice - b.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
      case "price:high to low": {
        let temp = foodItemsList;
        temp.sort((a, b) => b.offerPrice - a.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
    }
  };

  return (
    <>
      <div className="bodymainadmin">
        {/* <progress className="progress-bar" value="30" max="100"></progress> */}

        {/* ------------------------------Popup form for adding new food item ---------------*/}
        <div className="form-popup" id="form-popup">
          <div className="form-area">
            <button className="form-exit-btn" onClick={toggleFormPopup}>
              X
            </button>
            <br />
            <br />
            <form onSubmit={(e) => validation(e)}>
              <div className="form-section">
                <label htmlFor="input-name">
                  <b>Name</b>
                </label>
                <input
                  required={true}
                  type="text"
                  onInput={(e) => (tempFoodItemObj.name = e.target.value)}
                  placeholder="popcorn"
                ></input>
              </div>
              <div className="form-section">
                <label htmlFor="input-description">
                  <b>Description</b>
                </label>
                <input
                  required={true}
                  type="text"
                  onInput={(e) =>
                    (tempFoodItemObj.description = e.target.value)
                  }
                  id="input-description"
                  placeholder="cheesy popcorn 250g"
                ></input>
              </div>
              <div className="form-section">
                <label htmlFor="input-category">
                  <b>Category</b>
                </label>
                <select
                  required={true}
                  type="text"
                  onInput={(e) => (tempFoodItemObj.category = e.target.value)}
                  id="input-category"
                  placeholder="popcorn"
                >
                  <option value="Popcorn">Popcorn</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Combos">Combos</option>
                </select>
              </div>
              <div className="form-section">
                <label htmlFor="input-code">
                  <b>Item Code</b>
                </label>
                <input
                  required={true}
                  onInput={(e) =>
                    handleItemCodeValidation(e.target.value.toUpperCase())
                  }
                  type="text"
                  id="input-code"
                  placeholder="PC04"
                ></input>
                <label
                  htmlFor="input-code"
                  id="input-code-warning"
                  style={{
                    color: "red",
                    fontWeight: "light",
                    fontSize: "0.75rem",
                  }}
                >
                  {itemCodeWarning}
                </label>
              </div>
              <div className="price-div">
                <div className="form-section">
                  <label htmlFor="input-actualprice" min={0}>
                    <b>Actual Price</b>
                  </label>
                  <input
                    required={true}
                    type="number"
                    onInput={(e) =>
                      (tempFoodItemObj.actualPrice = e.target.value)
                    }
                    onMouseDown={() => setActualPriceError("")}
                    id="input-actualprice"
                    placeholder="2800"
                  ></input>
                </div>
                <div className="form-section">
                  <label htmlFor="input-offerprice" min={0}>
                    <b>Offer Price</b>
                  </label>
                  <input
                    required={true}
                    type="number"
                    onInput={(e) =>
                      (tempFoodItemObj.offerPrice = e.target.value)
                    }
                    id="input-offerprice"
                    placeholder="1700"
                    onMouseDown={() => setActualPriceError("")}
                  ></input>
                </div>
              </div>

              <div className="form-section">
                <span className="input-errors">{actualPriceError}</span>
                <label htmlFor="input-quantity" min={0}>
                  <b>Quantity</b>
                </label>
                <input
                  required={true}
                  type="number"
                  onInput={(e) =>
                    (tempFoodItemObj.quantityAvailable = e.target.value)
                  }
                  onMouseDown={() => setQuantityError("")}
                  id="input-quantity"
                  placeholder="200"
                ></input>
                <span className="input-errors">{quantityError}</span>
              </div>
              <div className="form-section">
                <label htmlFor="input-imageurl">
                  <b>Image url</b>
                </label>

                <input
                  required={true}
                  type="text"
                  onInput={(e) =>
                    (tempFoodItemObj.itemImageUrl = e.target.value)
                  }
                  id="input-imageurl"
                  placeholder="Https://source.unsplash.com/random"
                ></input>
              </div>

              <div className="submit-btn">
                <button type="submit" className="btn btn-sm btn-primary mt-3">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* ------------------------------Popup form for adding new food item ends here---------------*/}

        {/* -----------------------------Popup for delete option -------------------------------------*/}
        <div id="delete-popup" className="delete-popup">
          <div className="delete-warning">
            <p>This item will be deleted permanently!</p>
            <div className="delete-choice">
              <button className="delete-btn" onClick={deleteItem}>
                delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => handleView("delete-popup")}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
        {/* -----------------------------End of Popup for delete option  -------------------------------------*/}

        {/* -----------------------------Popup for Edit option -------------------------------------*/}
        <div className="edit-popup-bg" id="edit-popup-bg">
          <div className="edit-popup-area">
            <label htmlFor="name">Name</label>
            <br />
            <input
              placeholder={tempFoodItemDisplayObj.name}
              defaultValue={tempFoodItemDisplayObj.name}
              className="name"
              onInput={(e) => editAttribute("name", e.target.value)}
            ></input>
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <input
              placeholder={tempFoodItemDisplayObj.description}
              defaultValue={tempFoodItemDisplayObj.description}
              className="description"
              onInput={(e) => editAttribute("description", e.target.value)}
            ></input>
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <span
              className="category"
              onChange={(e) => editAttribute("category", e.target.value)}
            >
              <select name="category" id="category-select" className="category">
                {categories.slice(1).map((item) =>
                  item == tempFoodItemDisplayObj.category ? (
                    <option key={item} selected value={item}>
                      {item}
                    </option>
                  ) : (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </span>
            <br />
            <label htmlFor="actual-price">Actual-price</label>
            <br />
            <input
              placeholder={tempFoodItemDisplayObj.actualPrice}
              defaultValue={tempFoodItemDisplayObj.actualPrice}
              className="actual-price"
              onInput={(e) => editAttribute("actualPrice", e.target.value)}
            ></input>
            <br />
            <label htmlFor="offer-price">Offer-price</label>
            <br />
            <input
              placeholder={tempFoodItemDisplayObj.offerPrice}
              defaultValue={tempFoodItemDisplayObj.offerPrice}
              className="offer-price"
              onInput={(e) => editAttribute("offerPrice", e.target.value)}
            ></input>
            <br />
            <label htmlFor="quantity-available">Quantity-available</label>
            <br />
            <input
              placeholder={tempFoodItemDisplayObj.quantityAvailable}
              defaultValue={tempFoodItemDisplayObj.quantityAvailable}
              className="quantity-available"
              onInput={(e) =>
                editAttribute("quantityAvailable", e.target.value)
              }
            ></input>
            <br />
            <label htmlFor="Image-url">Image-url</label>
            <input
              placeholder={tempFoodItemDisplayObj.itemImageUrl}
              defaultValue={tempFoodItemDisplayObj.itemImageUrl}
              className="Image-url"
              onInput={(e) => editAttribute("imageUrl", e.target.value)}
            ></input>
            <div className="buttons">
              <button
                className="save-edit btn btn-sm btn-primary mt-3"
                title="Save edited details"
                onClick={() => editItem()}
              >
                Save
              </button>
              <button
                className="cancel-edit btn btn-sm btn-primary mt-3"
                title="Cancel editing"
                onClick={() => handleView("edit-popup-bg")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* -----------------------------End of Popup for Edit option -------------------------------------*/}

        {/* ------------------------------Body left start here-------------------- */}
        <div className="body-left">
          {/* ----------------------------Ad-Image display-------------------------- */}
          <div className="adcard-display">
            <a href="#" title="click to get offer">
              <img className="ad-image" src={imageUrl} alt="ad-image" />
            </a>
          </div>
          {/* ----------------------------End od Ad-Image display-------------------------- */}
          {/* ----------------------------Category list start-------------------------- */}
          <div className="food-category">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={(e) => handleCategorySelectedEvent(e.target.id)}
                    key={category}
                    id={category}
                    title={`View ${category}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li className="sorting">
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
              <li className="add-new-food-item">
                <button
                  onClick={() => toggleFormPopup()}
                  title={`Add new food item`}
                >
                  {"Add new Item"}
                </button>
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
                  <div className="container" key={item.id}>
                    <div className="itemImage">
                      <img src={item.itemImageUrl} alt="Image of food item" />
                      <hr />
                    </div>
                    <div className="details">
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
                        <div className="button-container">
                          <button
                            title="Add item to list"
                            className="btn btn-outline-danger btn-sm  item-btn add"
                            value={item.id}
                            onClick={(e) =>
                              handleFoodItemAddEvent(e.target.value)
                            }
                          >
                            Add
                          </button>
                          <button
                            title="Edit details"
                            className="btn btn-outline-danger btn-sm  item-btn edit"
                            value={item.id}
                            onClick={(e) =>
                              handleFoodItemEditEvent(e.target.value)
                            }
                          >
                            Edit
                          </button>
                          <button
                            title="Delete permanently"
                            className="btn btn-outline-danger btn-sm  item-btn delete"
                            value={item.id}
                            onClick={(e) =>
                              handleFoodItemDeleteEvent(e.target.value)
                            }
                          >
                            Delete
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
        <div className="body-right">
          <div className="body-right-title">
            <p>ORDER SUMMAARY</p>
          </div>
          <br />
          <div className="ticket-details">
            <div className="ticket-price">
              <p>
                {ticketBookingSummary.seatType.toUpperCase()}
                {" - "}
                {ticketBookingSummary.seats.toString()}
                <small>{` (${ticketBookingSummary.totalTickets} Tickets)`}</small>
              </p>
              <p className="amount-display">Rs.{totalTicketPrice.toFixed(2)}</p>
              <p className="theatrename-display">
                {ticketBookingSummary.theatre}
              </p>
            </div>
            <br />
            <div className="convenience-fee">
              <p className="convenience-fee-text">{" Convenience fees"}</p>
              <p className="amount-display">
                Rs.{totalConvenienceFee.toFixed(2)}
              </p>
              <p
                className="sub-convenience-fee conv-fee-text "
                style={{ marginTop: "1rem", marginLeft: "2rem" }}
              >
                {"Base Amount"}
              </p>
              <p
                className="sub-convenience-fee amount-display"
                style={{ marginTop: "1rem" }}
              >{`Rs. ${baseAmount.toFixed(2)} `}</p>
              <p
                className="sub-convenience-fee conv-fee-text "
                style={{ marginTop: "0.3rem", marginLeft: "2rem" }}
              >{`Integrated GST (IGST) @ ${IGSTPercentage * 100}% `}</p>
              <p
                className="sub-convenience-fee amount-display"
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
                    title="remove item from cart"
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
                    title="Increase quantity"
                    onClick={(e) => handleFoodItemAddEvent(e.target.value)}
                  >
                    {"+"}
                  </button>
                  <button
                    className="button dec-btn"
                    value={id}
                    title="Decrease quantity"
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
                Amount Payable: Rs.
                {totalAddonsCost + totalConvenienceFee + totalTicketPrice}
              </button>
            </div>
          </div>
        </div>
        {/* ------------------------------End of Body rightside part start-------------------- */}
      </div>
    </>
  );
};

export default AdminBody;
