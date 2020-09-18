import React from "react";
import { Box, Text } from "@chakra-ui/core";
import classes from "../Home/Module.module.css";

const Module = ({ moduleName }) => {
  return (
    <Box
      rounded="10px"
      w="auto"
      my={5}
      h="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      className={classes.Card}
    >
      <Text color="white">{moduleName}</Text>
    </Box>
  );
};

export default Module;
