import React from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/core";

const Question = ({ moduleName, questionId, question, type, options }) => {
  const [state, setState] = React.useState([]);
  const [textAnswer, setTextAnswer] = React.useState("");
  const [explanation, setExplanation] = React.useState("");
  const [answerStatus, setAnswerStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  function handleChange(evt, optionId) {
    const value =
      evt.target.type === "checkbox" ? evt.target.value : evt.target.value;
    if (evt.target.type === "radio") {
      const answer = [];
      answer.push(value);
      setState(answer);
    } else if (evt.target.type === "checkbox") {
      const checkedAnswer = [...state];
      if (!state.includes(value)) {
        checkedAnswer.push(value);
        setState(checkedAnswer);
      } else {
        const answer = checkedAnswer.filter((a) => a !== value);
        setState(answer);
      }
    } else if (evt.target.type === "textarea") {
      setTextAnswer(evt.target.value);
      const answer = [];
      answer.push(optionId);
      setState(answer);
    }
  }

  const submitHandler = () => {
    if (state.length < 1) {
      return;
    }
    setLoading(true);
    fetch("https://apiquizbytes.herokuapp.com/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moduleName: moduleName,
        questionId: questionId,
        selectedOptions: state,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setAnswerStatus(result.isCorrect);
          result.isCorrect
            ? setAnswerStatus("correct")
            : setAnswerStatus("wrong");
          setExplanation(result.explanation);
          setLoading(false);
        }
      })
      .catch((error) => {});
  };
  return (
    <Box px={3} pt={3}>
      <Text fontSize="xl">{question}</Text>
      <Box pt={2}>
        {options.map((option) => {
          return (
            <Box
              key={option._id}
              border={type === "text" ? "" : "solid 1px gray"}
              rounded="10px"
              py={3}
              pl={type === "text" ? "" : 3}
              my={3}
            >
              {type === "text" ? (
                <textarea
                  style={{
                    border: "1px solid gray",
                    outline: "none",
                    width: "100%",
                    overflow: "auto",
                    resize: "none",
                    borderRadius: "10px",
                  }}
                  value={textAnswer}
                  rows="5"
                  name="level"
                  onChange={(event) => handleChange(event, option._id)}
                />
              ) : (
                <input
                  type={type === "text" ? "textarea" : type}
                  style={{ border: "1px solid gray" }}
                  value={type === "text" ? textAnswer : option._id}
                  name="level"
                  checked={state.includes(option._id)}
                  onChange={(event) => handleChange(event, option._id)}
                />
              )}
              <Flex display="inline" pl={5}>
                {option.value}
              </Flex>
            </Box>
          );
        })}
      </Box>
      <Box>
        {answerStatus === "correct" ? (
          <Alert status="success">
            <AlertIcon />
            Correct Answer
          </Alert>
        ) : answerStatus === "wrong" ? (
          <Alert status="error">
            <AlertIcon />
            Wrong answer
          </Alert>
        ) : (
          ""
        )}
      </Box>
      {explanation ? (
        ""
      ) : (
        <Button
          borderColor="#161122"
          variant="outline"
          isLoading={loading}
          loadingText="Submitting"
          onClick={() => submitHandler()}
          my={5}
        >
          Submit
        </Button>
      )}

      <Box>
        {explanation ? (
          <Box>
            <Text fontSize="xl">Explanation:</Text>
            <Text fontFamily="mono" pl={2}>
              {explanation}
            </Text>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Divider />
    </Box>
  );
};

export default Question;
