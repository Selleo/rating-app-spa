import React, { Component } from "react";
import "./index.scss";
import { Formik } from "formik";
import { connect } from "react-redux";
import { storeUser } from "../../store/user/actions";
import PropTypes from "proptypes";
import _ from "lodash";
import Home from "./../Home";
import axios from "axios";

class Login extends Component {
  render() {
    return (
      <div>
        <div>{_.get(this, "props.user.email")}</div>
        <h1>Login</h1>
        <Home />
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validate={values => {
            // same as above, but feel free to move this into a class method now.
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(
            values,
            { setSubmitting, setErrors /* setValues and other goodies */ }
          ) => {
            return axios
              .post("/login", values)
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
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  storeUser
};

Login.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
