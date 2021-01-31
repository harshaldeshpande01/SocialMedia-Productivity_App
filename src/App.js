import "./App.css";
import { Home, Login } from "./pages";
import { UserContextProvider } from "./contexts/user";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      <Router>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            {/* <Route path="/home" exact component={Deadlines} />
            <Route path="/home" exact component={Courses} /> */}
      </Router>
    </UserContextProvider>
  );
}

export default App;
