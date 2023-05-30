import React, { FC, useEffect } from "react";
import { TextField } from "@mui/material";
import { useController, UseFormSetError } from "react-hook-form";
export interface FormValues {
  password: string;
  password_confirm: string;
  email: string;
  name: string;
  phone: string;
  univ: string;
}

interface Props {
  control: any;
  name: string;
  setError: UseFormSetError<FormValues>;
}

const Emailfield = ({ control, name }: Props) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: "Required",
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "wrong email pattern",
      },
    },
  });

  useEffect(() => {
    console.log(field.name);
    console.log(fieldState.error);
  }, [fieldState.error]);

  return (
    <TextField
      variant="outlined"
      size="small"
      label={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value || ""}
      name={field.name}
      inputRef={field.ref}
      error={fieldState.error !== undefined}
      helperText={
        fieldState.error !== undefined ? fieldState.error.message : ""
      }
    />
  );
};

export default Emailfield;
