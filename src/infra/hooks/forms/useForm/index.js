/* eslint-disable no-console */
import React from 'react';

function formatErrors(yupErrorsInner = []) {
  return yupErrorsInner.reduce((errorObjectAcc, currentError) => {
    const fieldName = currentError.path;
    const errorMessage = currentError.message;
    return {
      ...errorObjectAcc,
      [fieldName]: errorMessage,
    };
  }, {});
}

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const formStates = {
    DEFAULT: 'DEFAULT',
    LOADING: 'LOADING',
    DONE: 'DONE',
    ERROR: 'ERROR',
  };
  const [values, setValues] = React.useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouchedFields] = React.useState({});
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(
    formStates.DEFAULT,
  );

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      const formatedErrors = formatErrors(err.inner);
      setErrors(formatedErrors);
      setIsFormDisabled(true);
    }
  }

  React.useEffect(() => {
    validateValues(values).catch((err) => {
      console.log(err);
    });
    setSubmissionStatus(formStates.DEFAULT);
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
      setIsFormSubmited(true);
      onSubmit(values);
    },
    handleChange(event) {
      const { name, value } = event.target;

      setValues((currentValues) => ({
        ...currentValues,
        [name]: value,
      }));
    },
    isFormDisabled,
    setIsFormDisabled,
    errors,
    touched,
    setIsFormSubmited,
    isFormSubmited,
    setSubmissionStatus,
    submissionStatus,
    formStates,
    handleBlur(event) {
      const { name } = event.target;

      setTouchedFields({
        ...touched,
        [name]: true, // usuario: true, senha: true ...
      });
    },
  };
}
