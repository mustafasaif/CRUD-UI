import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateForm from "./UpdateUser";
import axios from "axios";

const GetAllUsers = () => {
  const [user, setUser] = useState([]);
  const [row, setRow] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/v1/all")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Age",
      selector: (row) => row.Age,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <DeleteIcon
            onClick={() => {
              console.log(row);
            }}
          />
          <EditIcon
            onClick={() => {
              setShow(true);
              setRow(row);
              console.log(row);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <UpdateForm
        Title="Testing"
        show={show}
        hide={() => {
          setShow(false);
        }}
        data={row}
      />
      <DataTable columns={columns} data={user} pagination />
    </>
  );
};

export default GetAllUsers;
