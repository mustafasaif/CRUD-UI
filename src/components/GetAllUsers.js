import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
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
        Title="Testing"
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
      <DataTable columns={columns} data={user} pagination />
    </>
  );
};

export default GetAllUsers;
