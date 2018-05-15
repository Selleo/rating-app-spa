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
      <div class="wrapper">
        <header class="header">
          <div class="header__image" />

          <div class="header__title">
            <div class="header__text">Haxorz Unconference</div>
            <hr class="header__title_hr" />
            <div class="header__counter">
              Days: <span class="number">10</span> Hours:{" "}
              <span class="number">6</span> Minutes:{" "}
              <span class="number">4</span> Seconds:{" "}
              <span class="number">27</span>
            </div>
          </div>
        </header>
        <div class="login">
          <div class="login__container">
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
                  this.props.storeUser(response.data.user);
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
                    errors.email && <div class="errors">{errors.email}</div>}
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
                      <div class="errors">{errors.password}</div>
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
