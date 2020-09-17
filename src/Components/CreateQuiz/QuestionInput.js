import React from "react";
import { Text, Box } from "@chakra-ui/core";

const QuestionInput = ({ label, value, handler, index }) => {
  return (
    <Box>
      <Text fontSize="lg" py={2}>
        {label}
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
        value={value}
        onChange={(event) => handler(index)(event)}
      />
    </Box>
  );
};

export default QuestionInput;
