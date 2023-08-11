import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeletePopUp = ({ handleClose, open, handleDelete }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ background: "#c25a5a" }} id="alert-dialog-title">
          {"Do you wish to delete this user?"}
        </DialogTitle>
        <DialogContent style={{ background: "#c25a5a" }}>
          <DialogContentText id="alert-dialog-description">
            Once the user is deleted the data can not be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: "#c25a5a" }}>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletePopUp;
