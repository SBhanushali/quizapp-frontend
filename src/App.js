import React from "react";
import { Box, Grid } from "@chakra-ui/core";
import ModuleNavigation from "./Components/ModuleNavigation/ModuleNavigation";

function App() {
  return (
    <Grid gridTemplateColumns="3fr 10fr">
      <ModuleNavigation />
    </Grid>
  );
}

export default App;
