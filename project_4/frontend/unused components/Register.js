import React from "react";
import { useState, useEffect } from "react";
import { FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import Button from "react-bootstrap/Button";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  // global context and useHistory later
  const { isLoading, showAlert, displayAlert } = useAppContext();
  //spread to use all the values
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log(values);
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <Button variant="info" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "login"}
          </Button>
        </p>
      </form>
    </div>
  );
}

export default Register;
