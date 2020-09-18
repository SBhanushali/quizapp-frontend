import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AttemptQuiz from "./Components/AttemptQuiz/AttemptQuiz";
import CreateQuiz from "./Components/CreateQuiz/CreateQuiz";
import Home from "./Components/Home/Home";

function App() {
  return (
    // <Grid gridTemplateColumns="3fr 10fr">
    <>
      <Navbar />
      <Switch>
        <Route path="/home" children={<Home />} />
        <Route path="/create" children={<CreateQuiz />} />
        <Route path="/:moduleName" children={<AttemptQuiz />} />
      </Switch>
    </>
    // </Grid>
  );
}

export default App;
