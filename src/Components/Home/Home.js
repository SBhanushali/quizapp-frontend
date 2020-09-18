import React, { useEffect, useState } from "react";
import { Route, NavLink, useParams } from "react-router-dom";
import { Box, SimpleGrid } from "@chakra-ui/core";
import Module from "./Module";

const Home = () => {
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
    <SimpleGrid
      columns={[1, 2, null, 4]}
      spacingY="40px"
      spacingX="20px"
      pt="10vh"
      px={5}
    >
      {moduleMap}
    </SimpleGrid>
  );
};

export default Home;
