import { React, useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateForm from "./UpdateUser";
import { deleteUser, getUsers } from "../client/client";
import DeletePopUp from "./DeleteUser";

const GetAllUsers = () => {
  const [user, setUser] = useState([]);
  const [row, setRow] = useState();
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteUser(row)
      .then(() => {
        setOpen(false);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUser(data);
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

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
              handleClickOpen();
              setRow(row);
            }}
          />
          <EditIcon
            onClick={() => {
              setShow(true);
              setRow(row);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <UpdateForm
        Title="Update User Info"
        show={show}
        hide={() => {
          setShow(false);
        }}
        setShow={setShow}
        data={row}
        setRefresh={setRefresh}
      />
      <DeletePopUp
        handleClickOpen={handleClickOpen}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <DataTable columns={columns} data={user} pagination theme="solarized" />
    </>
  );
};

export default GetAllUsers;
