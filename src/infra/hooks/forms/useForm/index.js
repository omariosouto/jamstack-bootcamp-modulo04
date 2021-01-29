import React from 'react';

function formatErrors(errors) {
  return errors.reduce((acc, error) => {
    const valueName = error.path;
    return ({
      ...acc,
      [valueName]: error,
    });
  }, {});
}

export function useForm({
  initialValues,
  onSubmit,
  validateSchema,
}) {
  const [values, setValues] = React.useState(initialValues);

  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouchedFields] = React.useState({});
  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      setErrors(formatErrors(err.inner));
      setIsFormDisabled(true);
    }
  }

  React.useEffect(() => {
    validateValues(values)
      .catch(() => {});
  }, [values]);

  return {
    values,
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    // Validação
    errors,
    isFormDisabled,
    setIsFormDisabled,
    touched,
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');
      setTouchedFields({
        ...touched,
        [fieldName]: true,
      });
    },
  };
}
