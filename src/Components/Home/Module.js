import React from "react";
import { Box, Text } from "@chakra-ui/core";
import Classes from "./Module.module.css";

const Module = ({ moduleName }) => {
  return (
    <Box
      rounded="10px"
      w="auto"
      h="200px"
      border="1px solid #eee"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      className={Classes.Card}
    >
      <Text fontSize="xl" color="white">
        {moduleName}
      </Text>
    </Box>
  );
};

export default Module;
