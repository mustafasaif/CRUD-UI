import { React, useState, useEffect } from "react";
import axios from "axios";
import "./table.css";
function GetAllUsers() {
  const [user, setUser] = useState([]);
  console.log(user);
  useEffect(() => {
    handleretrieveUser();
  }, []);

  const handleretrieveUser = async () => {
    try {
      const users = await axios.get(
        "http://localhost:3002/create_user/user_info"
      );
      console.log(users.data);
      setUser(users.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="headeralign">
        <h2 className="headingget">HELLO YOU IN GET ALL USERS PAGE</h2>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Age</td>

            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.map((item, _id) => {
              return (
                // <>
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>{item.Email}</td>
                </tr>
                // </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllUsers;
