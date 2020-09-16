import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";
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
    return <Module key={module._id} moduleName={module.moduleName} />;
  });
  return (
    <Box height="100vh" px={5} overflowY="auto">
      {moduleMap}
    </Box>
  );
};

export default ModuleNavigation;
