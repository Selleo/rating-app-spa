import React, { Component } from "react";
import "../../stylesheets/index.scss";
import { Formik } from "formik";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import PropTypes from "proptypes";
import yup from "yup";
import client from "../../client";
import { storeUser } from "../../store/user/actions";

class Login extends Component {
  validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  });

  render() {
    return (
      <div className="wrapper">
        <header className="header">
          <div className="header__image" />

          <div className="header__title">
            <div className="header__text">Haxorz Unconference</div>
            <hr className="header__title_hr" />
            <div className="header__counter">
              Days: <span className="number">10</span> Hours:{" "}
              <span className="number">6</span> Minutes:{" "}
              <span className="number">4</span> Seconds:{" "}
              <span className="number">27</span>
            </div>
          </div>
        </header>
        <div className="login">
          <div className="login__container">
            <h2>Login</h2>
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
                <form onSubmit={handleSubmit} className="login__form form">
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email &&
                    errors.email && (
                      <div className="errors">{errors.email}</div>
                    )}
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password &&
                    errors.password && (
                      <div className="errors">{errors.password}</div>
                    )}
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  storeUser,
  push
};

Login.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
