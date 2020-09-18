import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  RadioGroup,
  Radio,
  Flex,
  Icon,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import CheckboxOption from "./CheckboxOption";
import QuestionInput from "./QuestionInput";

const CreateQuiz = () => {
  const [moduleName, setModuleName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const addQuestion = (e) => {
    e.preventDefault();
    let questionClone = questions.concat([
      {
        question: "",
        inputType: "radio",
        explanation: "",
        options: [],
      },
    ]);
    setQuestions(questionClone);
  };

  const handleQuestionText = (i) => (e) => {
    let questionClone = [...questions];
    questionClone[i].question = e.target.value;
    setQuestions(questionClone);
  };

  const handleExplanationText = (i) => (e) => {
    let questionClone = [...questions];
    questionClone[i].explanation = e.target.value;
    setQuestions(questionClone);
  };

  const handleInputType = (i) => (e) => {
    let questionClone = [...questions];
    questionClone[i].inputType = e.target.value;
    questionClone[i].options = [];
    if (e.target.value === "text") {
      questionClone[i].options.push({
        isCorrect: true,
      });
    }
    setQuestions(questionClone);
  };

  const addOptions = (i) => (e) => {
    e.preventDefault();
    let questionClone = [...questions];
    if (questionClone[i].inputType === "text") return;
    questionClone[i].options.push({
      value: "",
      isCorrect: false,
    });

    setQuestions(questionClone);
  };

  const handleOptionText = (index, i) => (e) => {
    let questionClone = [...questions];
    questionClone[index].options[i].value = e.target.value;
    setQuestions(questionClone);
  };
  const handleRadioOptionInput = (index, i) => (e) => {
    let questionClone = [...questions];
    questionClone[index].options.map((option) => (option.isCorrect = false));
    questionClone[index].options[i].isCorrect = !questionClone[index].options[i]
      .isCorrect;
    setQuestions(questionClone);
  };
  const handleCheckboxOptionInput = (index, i) => (e) => {
    let questionClone = [...questions];
    questionClone[index].options[i].isCorrect = !questionClone[index].options[i]
      .isCorrect;
    setQuestions(questionClone);
  };

  const handleDelete = (i) => (e) => {
    e.preventDefault();
    let questionsClone = [...questions.slice(0, i), ...questions.slice(i + 1)];
    setQuestions(questionsClone);
  };

  const validateQuiz = () => {
    if (moduleName.length < 1) {
      toast({
        position: "top-right",
        title: "Module Name",
        description: "Module Name cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (questions.length < 1) {
      toast({
        position: "top-right",
        title: "Question",
        description: "Add at least one question",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (questions[0].question.length < 1) {
      toast({
        position: "top-right",
        title: "Question",
        description: "Question cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }

    const validation = () => {
      for (let i = 0; i < questions.length; i++) {
        for (var key in questions[i]) {
          if (key !== "options" && questions[i][key].length < 1) return false;
        }
      }
      return true;
    };
    if (!validation()) {
      toast({
        position: "top-right",
        title: "Question",
        description: "Fill all the fields in question",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }

    const optionValidation = () => {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].options.length < 1) {
          toast({
            position: "top-right",
            title: "Option",
            description: "Must have at least on option",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return false;
        } else if (questions[i].options.length > 0) {
          for (let j = 0; j < questions[i].options.length; j++) {
            if (
              questions[i].inputType !== "text" &&
              questions[i].options[j].value.length < 1
            ) {
              toast({
                position: "top-right",
                title: "Option",
                description: "Option Field cannot be empty",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              return false;
            }
          }
        }
      }
      return true;
    };

    if (!optionValidation()) {
      return false;
    }

    const correctOptionValidation = () => {
      for (let i = 0; i < questions.length; i++) {
        let noOptionsSelected = true;
        for (let j = 0; j < questions[i].options.length; j++) {
          if (questions[i].options[j].isCorrect) {
            noOptionsSelected = false;
          }
        }
        if (noOptionsSelected) {
          toast({
            position: "top-right",
            title: "Option",
            description: "Choose correct answer",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return false;
        }
      }
      return true;
    };

    if (!correctOptionValidation()) {
      return false;
    }
    return true;
  };

  const submitHandler = () => {
    if (validateQuiz()) {
      setLoading(true);
      fetch("http://localhost:8080/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleName: moduleName,
          moduleQuestions: questions,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setLoading(false);
            toast({
              position: "top-right",
              title: "Create",
              description: "Quiz for this module created",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            history.push("/home");
          } else if (!result.success) {
            setLoading(false);
            toast({
              position: "top-right",
              title: "Error",
              description: "Make sure module name is unique",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch(() => {
          setLoading(false);
          toast({
            position: "top-right",
            title: "Error",
            description: "Make sure module name is unique",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };
  return (
    <>
      <Box pt="12vh" px={10}>
        <Text fontSize="lg" py={2}>
          Module Name
          <span style={{ color: "red" }}>*</span>
        </Text>
        <input
          type="text"
          style={{
            border: "1px solid gray",
            height: "2.5rem",
            outline: "none",
            width: "100%",
            borderRadius: "5px",
            paddingLeft: "10px",
          }}
          value={moduleName}
          onChange={(event) => setModuleName(event.target.value)}
        />
        {questions.map((question, index) => (
          <Box key={index} border="1px solid gray" my={2} p={3} rounded="10px">
            <Flex justifyContent="space-between" py={2}>
              <Text fontSize="lg">
                Question<span style={{ color: "red" }}>*</span>
              </Text>

              <Icon
                name="delete"
                onClick={(event) => handleDelete(index)(event)}
              />
            </Flex>

            <input
              type="text"
              style={{
                border: "1px solid gray",
                height: "2.5rem",
                outline: "none",
                width: "100%",
                borderRadius: "5px",
                paddingLeft: "10px",
              }}
              value={question.question}
              onChange={(event) => handleQuestionText(index)(event)}
            />
            <Text fontSize="lg" py={2}>
              Input Type<span style={{ color: "red" }}>*</span>
            </Text>
            <RadioGroup
              onChange={(event) => handleInputType(index)(event)}
              value={question.inputType}
              display="flex"
            >
              <Radio value="radio">Radio</Radio>
              <Radio ml={3} value="checkbox">
                Checkbox
              </Radio>
              <Radio ml={3} value="text">
                Text
              </Radio>
            </RadioGroup>
            {question.inputType === "text" ? (
              ""
            ) : (
              <Text fontSize="lg" py={2}>
                Options<span style={{ color: "red" }}>*</span>
                <Tooltip
                  hasArrow
                  label="Create options for your question and select the correct answer"
                  placement="right"
                >
                  <Icon name="info" ml={1} />
                </Tooltip>
              </Text>
            )}
            {question.inputType === "radio" ? (
              <RadioGroup
                onChange={(e) =>
                  handleRadioOptionInput(index, e.target.value)(e)
                }
                defaultValue={0}
                width="100%"
              >
                {question.options.map((option, i) => (
                  <Radio key={i} value={i + ""} width="100%">
                    <Input
                      style={{
                        border: "1px solid gray",
                        height: "2.5rem",
                        outline: "none",
                        borderRadius: "5px",
                        paddingLeft: "10px",
                      }}
                      width={["65vw", "70vw", "70vw", "91vw"]}
                      onChange={(event) => handleOptionText(index, i)(event)}
                      value={option.value}
                    />
                  </Radio>
                ))}
              </RadioGroup>
            ) : question.inputType === "checkbox" ? (
              <Box>
                {question.options.map((option, i) => (
                  <CheckboxOption
                    i={i}
                    key={i}
                    option={option}
                    handleCheckboxOptionInput={handleCheckboxOptionInput}
                    handleOptionText={handleOptionText}
                    index={index}
                  />
                ))}
              </Box>
            ) : (
              ""
            )}
            {question.inputType === "text" ? (
              ""
            ) : (
              <Button
                variantColor="teal"
                variant="outline"
                onClick={(event) => addOptions(index)(event)}
                mt={2}
              >
                Add Option Field
              </Button>
            )}

            <QuestionInput
              label="Explanation"
              value={question.explanation}
              index={index}
              handler={handleExplanationText}
            />
          </Box>
        ))}

        <Button
          variantColor="teal"
          variant="outline"
          onClick={(event) => addQuestion(event)}
          mt={2}
        >
          Add Question
        </Button>
      </Box>
      <Flex justifyContent="center">
        <Button
          isLoading={isLoading}
          loadingText="Creating"
          variantColor="teal"
          variant="outline"
          onClick={submitHandler}
          mt={3}
        >
          Create Quiz
        </Button>
      </Flex>
    </>
  );
};

export default CreateQuiz;
