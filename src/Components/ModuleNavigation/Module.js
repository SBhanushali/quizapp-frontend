import React from "react";
import { Box, Text } from "@chakra-ui/core";

const Module = ({ moduleName }) => {
  return (
    <Box
      rounded="10px"
      w="auto"
      my={5}
      h="60px"
      boxShadow="0 3px 6px 0 rgba(0, 0, 0, 0.16)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
    >
      <Text>{moduleName}</Text>
    </Box>
  );
};

export default Module;
