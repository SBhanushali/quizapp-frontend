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
      <Link to="/home">
        <Text fontSize="3xl">QuizBytes</Text>
      </Link>
      <Link to="/create">
        <Button borderColor="#161122" variant="outline">
          Create
        </Button>
      </Link>
    </Flex>
  );
};

export default Navbar;
