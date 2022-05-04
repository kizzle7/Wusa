import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOption = ({ register, name, optionsData, label }) => {
  console.log(optionsData)
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Select
        </option>
        {optionsData?.result?.map((category) => {
          return <option value={category.id}>{category.name}</option>;
        })}
      </Select>
    </>
  );
};

export default SelectOption;
