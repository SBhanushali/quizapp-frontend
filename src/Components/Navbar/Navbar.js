import React from "react";
import { Flex, Text, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      justifyContent="space-between"
      height="8vh"
      backgroundColor="#fff"
      borderBottomWidth="1px"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="4"
      alignItems="center"
      px={5}
    >
      <Text fontSize="3xl">QuizApp</Text>
      <Link to="/create">
        <Button variantColor="teal" variant="outline">
          Create
        </Button>
      </Link>
    </Flex>
  );
};

export default Navbar;
