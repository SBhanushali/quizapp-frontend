import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/core";
import Question from "./Question";

const Quiz = (props) => {
  const questions = props.quiz.moduleQuestions.map((moduleQuestion) => (
    <Question
      key={moduleQuestion._id}
      moduleName={props.quiz.moduleName}
      questionId={moduleQuestion._id}
      question={moduleQuestion.question}
      type={moduleQuestion.inputType}
      options={moduleQuestion.options}
    />
  ));
  return (
    <Box>
      <Text fontSize="3xl">{props.quiz.moduleName}</Text>
      {questions}
    </Box>
  );
};

export default Quiz;
