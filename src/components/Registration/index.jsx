import React, { Component } from "react";
import { Formik } from "formik";
import "../../stylesheets/index.scss";
import client from "../../client";
import yup from "yup";
import PropTypes from "proptypes";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { storeUser } from "../../store/user/actions";

function equalTo(ref, msg) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value === this.resolve(ref);
    }
  });
}

yup.addMethod(yup.string, "equalTo", equalTo);

class Registration extends Component {
  validationSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .equalTo(yup.ref("password_confirmation"))
      .required(),
    password_confirmation: yup.string().required()
  });

  render() {
    return (
      <div className="registration">
        <h1>Registration</h1>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: ""
          }}
          validationSchema={this.validationSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              const response = await client.post("/register", values);
              this.props.storeUser(response.data);
              this.props.push("/");
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
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                placeholder="First Name"
              />
              {touched.first_name &&
                errors.first_name && <div>{errors.first_name}</div>}
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                placeholder="Last Name"
              />
              {touched.last_name &&
                errors.last_name && <div>{errors.last_name}</div>}
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
              <input
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password_confirmation}
              />
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
  push
};

Registration.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
