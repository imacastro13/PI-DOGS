import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from "./components/LandingPage/Landing"
import Home from './components/Home/Home';
import DogDetails from './components/DogDetails/DogDetails';
import AddDog from "./components/AddDog/AddDog"
import NavBar from './components/NavBar/NavBar';

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
        <Route exact path="/:id" component={DogDetails}/>
        <Route exact path="add" component={AddDog}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
