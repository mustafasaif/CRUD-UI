import React, { useState } from "react";
import axios from "axios";
import "./Singleuser.css";
function DeleteUser() {
  const [id, setid] = useState("");

  const handlechange = (event) => {
    const value = event.target.value;
    setid(value);
    console.log(id);
  };
  const handledelete = async (id, event) => {
    event.preventDefault();
    try {
      const deleteduser = await axios.delete(
        "http://localhost:3001/create_user/" + id
      );
      console.log(deleteduser);
      if (deleteduser.data.n === 1) {
        alert("USER DELETED SUCCESSFULLY");
      } else {
        alert("INVALID USER ID PLEASE TRY AGAIN");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={(e) => handledelete(id, e)} className="formstylesingle">
      <label className="labelstyle1">ENTER USER ID TO BE DELETED</label>
      <input
        className="inputstyle1"
        type="text"
        value={id}
        name="id"
        onChange={handlechange}
        required
      ></input>
      <button className="buttonstyle " type="submit">
        {" "}
        Submit
      </button>
    </form>
  );
}

export default DeleteUser;
