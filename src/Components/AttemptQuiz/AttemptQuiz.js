import React, { useState, useEffect } from "react";

import { Box, Spinner, Grid } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import ModuleNavigation from "../ModuleNavigation/ModuleNavigation";

const AttemptQuiz = () => {
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { moduleName } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/api/questions?moduleName=${moduleName}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.success) {
          setQuestion(result.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {});
  }, [moduleName]);

  return (
    <Grid gridTemplateColumns={["10fr", "10fr", "3fr 10fr", "3fr 10fr"]}>
      <ModuleNavigation />
      <Box pt="15vh" px={5} overflowY="scroll" overflowX="none" height="100vh">
        {isLoading ? <Spinner size="xl" /> : <Quiz quiz={question[0]} />}
      </Box>
    </Grid>
  );
};

export default AttemptQuiz;
