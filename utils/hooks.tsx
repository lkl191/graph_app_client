import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [input, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...input, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    input,
  };
};

export const useDataForm = (initialState = {}) => {
  const [inputData, setValues] = useState(initialState);

  const dataChange = (event) => {
    console.log(event);
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
    console.log(tmp);
    setValues(tmp);
  };
  return {
    inputData,
    dataChange,
  };
};
