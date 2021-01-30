import "./App.css";
import { Home } from "./pages";
// import {navbar} from "./containers/index";
import { UserContextProvider } from "./contexts/user";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      <Router>
            <Route path="/" exact component={Home} />
            <Route path="/chat" exact component={Home} />
      </Router>
      {/* <div className="app">
        <Home />
      </div> */}
    </UserContextProvider>
  );
}

export default App;
