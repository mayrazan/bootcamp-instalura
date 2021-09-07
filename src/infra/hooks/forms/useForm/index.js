import React from 'react';

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = React.useState(initialValues);

  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouchedFields] = React.useState({});

  React.useEffect(() => {
    validateSchema(values)
      .then(() => {
        setIsFormDisabled(false);
        setErrors({});
      })
      .catch((err) => {
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
      });
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
