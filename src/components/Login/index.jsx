import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { get } from "lodash";
import { push } from 'react-router-redux'
import PropTypes from "proptypes";
import yup from 'yup';
import client from '../../client';
import { storeUser } from "../../store/user/actions";
import Home from "./../Home";
import "./index.scss";

class Login extends Component {
  validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  render() {
    return (
      <div>
        <div>{get(this, "props.user.email")}</div>
        <h1>Login</h1>
        <Home />
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={this.validationSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              const response = await client.post("/login", values);
              this.props.storeUser(response.data.user);
              this.props.push('/')
            } catch (err) {
              const { response = {} } = err;

              if (response.status === 422) {
                actions.setErrors(response.data.errors);
              }
            } finally {
              actions.setSubmitting(false);
            }
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
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && <div>{errors.email}</div>}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && <div>{errors.password}</div>}
              </div>
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
  storeUser,
  push,
};

Login.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
