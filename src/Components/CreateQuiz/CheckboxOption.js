import React from "react";
import { Checkbox } from "@chakra-ui/core";

const CheckboxOption = ({
  i,
  handleCheckboxOptionInput,
  handleOptionText,
  index,
  option,
}) => {
  return (
    <Checkbox
      key={i}
      value={i + ""}
      onChange={(e) => handleCheckboxOptionInput(index, i)(e)}
      mb="0.5rem"
    >
      <input
        type="text"
        style={{
          border: "1px solid gray",
          height: "2.5rem",
          outline: "none",
          width: "91.3vw",
          borderRadius: "5px",
          paddingLeft: "10px",
        }}
        onChange={(event) => handleOptionText(index, i)(event)}
        value={option.value}
      />
    </Checkbox>
  );
};

export default CheckboxOption;
