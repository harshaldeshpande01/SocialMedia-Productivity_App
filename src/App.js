import "./App.css";
import { Home, Login, SignUp, Deadlines, Courses } from "./pages";
import { UserContextProvider } from "./contexts/user";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      <Router>
            <Route path="/" exact component={Login} />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/home" exact component={Home} />
      </Router>
    </UserContextProvider>
  );
}

export default App;
