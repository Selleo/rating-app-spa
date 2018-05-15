import React, { Component } from "react";
import { Formik } from "formik";
import "../../stylesheets/index.scss";
import axios from "axios";

class Registration extends Component {
  render() {
    return (
      <div class="wrapper wrapper__registration">
        <header class="header">
          <div class="header__image" />

          <div class="header__title">
            <div class="header__text">Registration</div>
          </div>
        </header>
        <div class="login">
          <div class="login__container">

            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: ""
              }}
              validate={values => {
                // same as above, but feel free to move this into a class method now.
                let errors = {};
                if (!values.first_name) {
                  errors.first_name = "First name must be set";
                }
                if (!values.last_name) {
                  errors.last_name = "Last name must be set";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (values.password !== values.password_confirmation) {
                  errors.password = "Passwords does not match";
                }
                return errors;
              }}
              onSubmit={(
                values,
                { setSubmitting, setErrors /* setValues and other goodies */ }
              ) => {
                return axios
                  .post("/register", values)
                  .then(() => this.props.storeUser(values))
                  .catch(err => {});
              }}
              render={({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                  />
                  {touched.email && errors.email && <div>{errors.email}</div>}
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    placeholder="Password confirmation"
                  />
                  {touched.password &&
                    errors.password && <div>{errors.password}</div>}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
