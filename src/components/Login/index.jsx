import React, { Component } from "react";
import "../../stylesheets/index.scss";
import { Formik } from "formik";

class Login extends Component {
  render() {
    return (
      <div class="wrapper">
        <header class="header">
          <div class="header__image">
          </div>

          <div class="header__title">
            <div class="header__text">Haxorz Unconference</div>
            <hr class="header__title_hr" />
            <div class="header__counter">
              Days: <span class="number">10</span> Hours: <span class="number">6</span> Minutes: <span class="number">4</span> Seconds: <span class="number">27</span>
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
                // LoginToMyApp(values).then(
                //   user => {
                //     setSubmitting(false);
                //     // do whatevs...
                //     // props.updateUser(user)
                //   },
                //   errors => {
                //     setSubmitting(false);
                //     // Maybe transform your API's errors into the same shape as Formik's
                //     setErrors(transformMyApiErrors(errors));
                //   }
                // );
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
                  {touched.email && errors.email && <div class="errors">{errors.email}</div>}
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
                  errors.password && <div class="errors">{errors.password}</div>}
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

export default Login;
