import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import CreateNewUser from "./components/CreateNewUser";
import GetAllUsers from "./components/GetAllUsers";
import GetSingleUser from "./components/GetSingleUser";
import DeleteUser from "./components/DeleteUser";
import UpdateUser from "./components/UpdateUser";

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/createuser" component={CreateNewUser} />
            <Route path="/getallusers" component={GetAllUsers} />
            <Route path="/getuser" component={GetSingleUser} />
            <Route path="/deleteuser" component={DeleteUser} />
            <Route path="/updateuser" component={UpdateUser} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
