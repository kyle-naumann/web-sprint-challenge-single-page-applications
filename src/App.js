import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import Form from "./Components/Form";

const App = () => {
  return (
    <div className="App">
    <Navigation/>
    
    <Switch>
      <Route path="/order-form" render={() => <Form/>}/>
      <Route path="/" render={() => <Home/>}/>
    </Switch>
      </div>
  
  );
};
export default App;

