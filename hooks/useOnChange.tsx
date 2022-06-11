import React, { useState } from "react";

export const useForm = function <T>(callback, initialState: T) {
  const [input, setValues] = useState(initialState);

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setValues({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    setValues,
    input,
  };
};

export const useDataForm = function (initialState: {
  label: string[],
  value: number[]
}) {
  const [inputData, setValues] = useState(initialState);

  const dataChange = (event) => {
    let tmp = {
      label: [],
      value: [],
    };
    for (let i = 0; i < event.length; i++) {
      for (let ii = 0; ii < event[i].length; ii++) {
        if (event[0][ii].value != null) {
          tmp.label[ii] = event[0][ii].value;
        }
        if (event[i][ii].value != null) {
          tmp.value[ii] = event[i][ii].value;
        }
      }
    }
    setValues(tmp);
  };
  return {
    inputData,
    dataChange,
  };
};
