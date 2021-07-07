export function validateForm(newPerson) {
  const errorsEntries = Object.entries(newPerson).map(([name, value]) => {
    const error = value ? null : `Field ${name} is required`;

    return [name, error];
  });

  const hasErrors = errorsEntries.some(([, error]) => !!error);

  const errors = errorsEntries.reduce((acc, [name, error]) => {
    return {
      ...acc,
      [name]: error,
    };
  }, {});

  return {
    errors,
    hasErrors,
  };
}
