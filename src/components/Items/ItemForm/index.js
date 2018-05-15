import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import { map } from 'lodash';

const itemTypes = [
  {
    value: 'workshop',
    label: 'Workshop',
  },
  {
    value: 'presentation',
    label: 'Presentation',
  }
];

const durations = {
  workshop: [
    {
      value: '60',
      label: '60 minutes',
    },
    {
      value: '90',
      label: '90 minutes',
    },
    {
      value: '120',
      label: '120 minutes',
    },
  ],
  presentation: [
    {
      value: '15',
      label: '15 minutes',
    },
    {
      value: '30',
      label: '30 minutes',
    }
  ],
}

const validationSchema = yup.object({
  topic: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().oneOf(map(itemTypes, 'value')),
  duration: yup.string().required().when('type', (type, schema) => {
    const values = map(durations[type], 'value');
    return schema.oneOf(values)
  })
})

const ItemForm = ({ saveItem, onItemSaved, initialValues }) => (
  <div className="wrapper wrapper__presentation">
    <header className="header">
      <div className="header__image" />

      <div className="header__title">
        <div className="header__text">Add workshop / presentation</div>

      </div>
    </header>
    <div className="login">
      <div className="login__container">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await saveItem(values);
              onItemSaved(response.data.item);
            } catch (err) {
              const { response = {} } = err;

              if (response.status === 422) {
                actions.setError(err.response.data.item);
              }

              console.error(err);
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <h2>Submit your proposal</h2>
                {itemTypes.map(({ value, label }) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="type"
                      value={value}
                      onChange={handleChange}
                      checked={values.type === value}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div>
                <h2>Session duration</h2>
                {durations[values.type].map(({ value, label }) => (
                  <label key={value}>
                    <input
                      name="duration"
                      type="radio"
                      value={value}
                      checked={values.duration === value}
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div>
                <label className="topic">
                  <div>Topic</div>

                  <input
                    type="text"
                    name="topic"
                    value={values.topic}
                    onChange={handleChange}
                    className="input-text"
                  />
                </label>
              </div>

              <div>
                <div>
                  <label htmlFor="description">
                    Description
                  </label>
                </div>

                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="input-text"
                />
              </div>

              <div>
                <button type="submit">
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>

      </div>
    </div>
  </div>
);

ItemForm.defaultProps = {
  initialValues: {
    topic: '',
    description: '',
    duration: '',
    type: 'workshop',
  }
}

export default ItemForm;
