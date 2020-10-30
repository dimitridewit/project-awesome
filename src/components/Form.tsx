import React, { FunctionComponent, useState, FormEvent } from "react";
import Input from "./Input";

export type TextField = {
  value: string;
  error: string | false;
};

export type Checkbox = {
  value: boolean;
};

type FormState = {
  firstName: TextField;
  lastName: TextField;
  email: TextField;
  agree: Checkbox;
};

type TextFields = "firstName" | "lastName" | "email";

const initialState: FormState = {
  firstName: {
    value: "",
    error: false
  },
  lastName: {
    value: "",
    error: false
  },
  email: {
    value: "",
    error: false
  },
  agree: {
    value: false
  }
};

const Form: FunctionComponent = () => {
  const [formState, setFormState] = useState(initialState);
  const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const fieldName: string = e.currentTarget.name;
    const currentField = formState[e.currentTarget.name as keyof FormState];
    const value =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;

    setFormState({
      ...(formState as FormState),
      [fieldName as keyof FormState]: {
        ...(currentField as TextField),
        value: value
      }
    });
  };

  const validateField = (field: string, fieldData: TextField): TextField => {
    let error: string | boolean = false;
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);

    console.log(field);
    switch (field) {
      case "firstName":
        if (fieldData.value.length === 0) {
          error = "Required field";
        }
        break;
      case "lastName":
        if (fieldData.value.length === 0) {
          error = "Required field";
        }
        break;
      case "email":
        if (fieldData.value.length === 0) {
          error = "Required field";
        }
        if (!emailRegex.test(fieldData.value)) {
          error = "Invalid emailadress";
        }
        break;
      default:
        break;
    }

    return {
      ...(fieldData as TextField),
      error: error
    };
  };

  const onBlurHandler = (e: FormEvent<HTMLInputElement>) => {
    const fieldName: string = e.currentTarget.name;
    const field = formState[fieldName as TextFields];

    setFormState({
      ...formState,
      [fieldName]: validateField(fieldName, field)
    });
  };

  const onClickHandler = (e: FormEvent) => {
    setFormState(initialState);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={onSubmitHandler} className="pure-form pure-form-stacked">
      <fieldset>
        <legend>Sign up here!</legend>
        <label htmlFor="firstName">First name:</label>
        <Input
          field={formState.firstName}
          name="firstName"
          onBlurHandler={onBlurHandler}
          onChangeHandler={onChangeHandler}
          type="text"
        />
        <label htmlFor="lastName">Last name:</label>
        <Input
          field={formState.lastName}
          name="lastName"
          onBlurHandler={onBlurHandler}
          onChangeHandler={onChangeHandler}
          type="text"
        />
        <label htmlFor="email">Email:</label>
        <Input
          field={formState.email}
          name="email"
          onBlurHandler={onBlurHandler}
          onChangeHandler={onChangeHandler}
          type="text"
        />
        <label htmlFor="agree">
          Do you agree to the terms?
          <input
            type="checkbox"
            name="agree"
            id="agree"
            onChange={onChangeHandler}
            checked={formState.agree.value}
          />
        </label>
        <button type="submit" className="pure-button pure-button-primary">
          Save
        </button>
        <button type="button" className="pure-button" onClick={onClickHandler}>
          Clear fields
        </button>
      </fieldset>
    </form>
  );
};

export default Form;
