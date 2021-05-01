import "./App.css";
import { Home, SignUp, SignIn, ForgotPassword, Courses, DeadlinesPage} from "./pages";
import {Feedback, Deadlines} from './containers/index'
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
            <Route path="/deadlines" exact component={DeadlinesPage} />
            <Route path="/contact" exact component={Feedback} />
      </Router>
  );
}

export default App;

// {
//   "hosting": {
//     "public": "build",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ]
//   }
// }
