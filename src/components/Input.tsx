import React, { FunctionComponent } from "react";
import { TextField } from "./Form";

export type InputProps = {
  type: string;
  name: string;
  onChangeHandler: Function;
  onBlurHandler: Function;
  field: TextField;
};

const Input: FunctionComponent<InputProps> = ({
  name,
  type,
  field,
  onBlurHandler,
  onChangeHandler
}) => {
  return (
    <React.Fragment>
      <input
        id={name}
        name={name}
        onChange={e => onChangeHandler(e)}
        onBlur={e => onBlurHandler(e)}
        type={type}
        value={field.value}
      />
      {field.error && (
        <span className="pure-form-message-inline">{field.error}</span>
      )}
    </React.Fragment>
  );
};

export default Input;
