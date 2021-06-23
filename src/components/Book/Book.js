import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  const handleCheckInDate = (date) => {
    const newDate = { ...setSelectedDate };
    newDate.checkIn = date;
    setSelectedDate(newDate);
  };
  const handleCheckOutDate = (date) => {
    const newDate = { ...setSelectedDate };
    newDate.checkOut = date;
    setSelectedDate(newDate);
  };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { bedType } = useParams();
  const handleBooking = () => {
    const booking = { ...loggedInUser, ...selectedDate };
    fetch("http://localhost:8080/addBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((booking) => console.log("booking success", booking));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        hello {loggedInUser.name}! Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM-dd-yyyy"
            margin="normal"
            id="check In Date"
            label="Date picker inline"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="check Out date"
            format="MM/dd/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Button onClick={handleBooking} variant="contained" color="primary">
        Primary
      </Button>
      <Bookings></Bookings>
    </div>
  );
};

export default Book;
