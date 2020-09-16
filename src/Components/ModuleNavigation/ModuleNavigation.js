import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";
import { Route, NavLink, useParams } from "react-router-dom";
import Module from "./Module";

const ModuleNavigation = () => {
  const [modules, setModules] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/modules", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.success) {
          setModules(result.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(modules);
  const moduleMap = modules.map((module) => {
    return (
      <NavLink
        key={module._id}
        to={`/${module.moduleName}`}
        activeStyle={{ color: "red", fontWeight: "bold" }}
      >
        <Module moduleName={module.moduleName} />
      </NavLink>
    );
  });
  return (
    <Box height="92vh" pt="8vh" px={5} overflowY="auto" borderRightWidth="1px">
      {moduleMap}
    </Box>
  );
};

export default ModuleNavigation;
