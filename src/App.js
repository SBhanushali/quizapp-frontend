import React from "react";
import { Grid } from "@chakra-ui/core";
import ModuleNavigation from "./Components/ModuleNavigation/ModuleNavigation";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AttemptQuiz from "./Components/AttemptQuiz/AttemptQuiz";
import CreateQuiz from "./Components/CreateQuiz/CreateQuiz";

function App() {
  return (
    // <Grid gridTemplateColumns="3fr 10fr">
    <>
      <Navbar />
      <Switch>
        <Route path="/create" children={<CreateQuiz />} />
        <Route path="/:moduleName" children={<AttemptQuiz />} />
      </Switch>
    </>
    // </Grid>
  );
}

export default App;
