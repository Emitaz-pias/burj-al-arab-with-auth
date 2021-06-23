import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";

const Book = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { bedType } = useParams();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        hello {loggedInUser.name}! Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
    </div>
  );
};

export default Book;
