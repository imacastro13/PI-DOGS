import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from "./components/LandingPage/Landing"
import Home from './components/Home/Home';
import DogDetails from './components/DogDetails/DogDetails';
import NavBar from './components/NavBar/NavBar';
import AddDog from './components/AddDog/AddDog';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/home">
          <NavBar/>
          <Home/>
        </Route>
        <Route exact path="/add" component={AddDog}/>
        <Route exact path="/:id" component={DogDetails}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
