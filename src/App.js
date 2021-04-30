import "./App.css";
import { Home, SignUp, SignIn, ForgotPassword, Courses} from "./pages";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
            <Route path="/" exact component={SignIn} />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/home" exact component={Home} />
            <Route path="/courses" exact component={Courses} />
      </Router>
  );
}

export default App;
