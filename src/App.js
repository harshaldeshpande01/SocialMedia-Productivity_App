import "./App.css";
import { Home, SignUp, SignIn, ForgotPassword} from "./pages";
// import { UserContextProvider } from "./contexts/user";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // <UserContextProvider>
      <Router>
            <Route path="/" exact component={SignIn} />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/home" exact component={Home} />
      </Router>
    // </UserContextProvider> 
  );
}

export default App;
