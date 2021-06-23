import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8080/bookings?email=" + loggedInUser.email, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer  ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      {bookings.map((book) => (
        <li>
          {book.name} from:{new Date(book.checkIn).toDateString("dd/MM/YYYY")}
          to:{new Date(book.checkOut).toDateString("dd/MM/YYYY")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
