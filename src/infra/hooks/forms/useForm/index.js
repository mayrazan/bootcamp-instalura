import React from 'react';

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = React.useState(initialValues);

  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouchedFields] = React.useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      const formatedErrors = err.inner.reduce(
        (errorObjectAcc, currentError) => {
          const fieldName = currentError.path;
          const errorMessage = currentError.message;
          return {
            ...errorObjectAcc,
            [fieldName]: errorMessage,
          };
        },
        {},
      );
      setErrors(formatedErrors);
      setIsFormDisabled(true);
    }
  }

  React.useEffect(() => {
    validateValues(values);
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
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
    handleBlur(event) {
      const { name } = event.target;

      setTouchedFields({
        ...touched,
        [name]: true, // usuario: true, senha: true ...
      });
    },
  };
}
