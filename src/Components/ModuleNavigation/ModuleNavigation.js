import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";
import Module from "./Module";

const ModuleNavigation = () => {
  const [modules, setModules] = useState([]);
  useEffect(() => {
    fetch("https://apiquizbytes.herokuapp.com/modules", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.success) {
          setModules(result.data);
        }
      })
      .catch((error) => {});
  }, []);
  const moduleMap = modules.map((module) => {
    return (
      <NavLink
        key={module._id}
        to={`/${module.moduleName}`}
        activeStyle={{ fontSize: "1.5rem" }}
      >
        <Module moduleName={module.moduleName} />
      </NavLink>
    );
  });
  return (
    <Box
      height="92vh"
      pt="8vh"
      px={5}
      overflowY="auto"
      borderRightWidth="1px"
      display={["none", "none", "block", "block"]}
    >
      {moduleMap}
    </Box>
  );
};

export default ModuleNavigation;
