import React from 'react';

export function useForm({
  initialValues,
  onSubmit,
}) {
  const [values, setValues] = React.useState(initialValues);

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
  };
}
