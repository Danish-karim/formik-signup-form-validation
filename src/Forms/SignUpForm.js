import React from 'react';
import DropList from './DropList';
import { withFormik, ErrorMessage, Field, Form } from 'formik';
import Error from './Error';
import * as Yup from 'yup';

const options = [
  { value: 'Art', label: 'Art' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Science', label: 'Science' },
];
const formikWrapper = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    topics: [],
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log('valies',values)
    const payload = {
      ...values,
      topics: values.topics.map((t) => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 3000);
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Enter a Username'),
    email: Yup.string()
      .email('Please Enter a valid email address')
      .required('Please enter your email'),
    topics: Yup.array()
      .min(3, 'Please Select 3 items')
      .of(
        Yup.object().shape({
          value: Yup.string().required(''),
          label: Yup.string().required(''),
        })
      ),
  }),
});

const SignUpForm = (props) => {
  const {
    values,
    setFieldValue,
    setFieldTouched,
    handleReset,
    isSubmitting,
    dirty,
  } = props;
  return (
    <div>
      <Form className="p-5">
        <h1 style={{ textAlign: 'center' }}>Form</h1>
        <div className="form-group">
          <label>Username :</label>
          <Field
            name="username"
            type="text"
            placeholder="Enter Username"
            className="form-control"
          />
          <ErrorMessage component={Error} name="username" />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <Field
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="form-control"
          />
          <ErrorMessage component={Error} name="email" />
        </div>
        <div className="form-group">
          <label>Favourite Topics</label>
          <DropList
            value={values.topics}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            options={options}
          />
          <ErrorMessage component={Error} name="topics" />
        </div>
        <span className="pr-1">
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
        </span>
        <span>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            SignUp
          </button>
        </span>
      </Form>
    </div>
  );
};
const EnhacedForm = formikWrapper(SignUpForm);
export default EnhacedForm;
