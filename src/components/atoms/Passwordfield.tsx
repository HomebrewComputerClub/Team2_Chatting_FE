import React, { FC, useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useController, UseFormSetError } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormValues } from "../../pages/signup";
interface Props {
  control: any;
  name: string;
  setError: UseFormSetError<FormValues>;
}

const Passwordfield = ({ control, name, setError }: Props) => {
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: {
      required: "Required",
      pattern: {
        value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
        message: "8~16자 영문, 숫자 조합",
      },
    },
  });

  useEffect(() => {
    console.log(field.name);
    console.log(fieldState.error);
  }, [fieldState.error]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Passwordfield;
