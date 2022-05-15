import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import CreateNewUser from './components/CreateNewUser'
import GetAllUsers from './components/GetAllUsers';
import GetSingleUser from './components/GetSingleUser';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
function App() {
  return (
    <div>
      <Router>
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
    </div >
  );
}
export default App;
