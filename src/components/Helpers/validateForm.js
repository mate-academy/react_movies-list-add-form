export const validateForm = (inputs, urlValidator) => {
  const inputsAmount = Array.from(Object.values(inputs));

  if (inputsAmount.some(input => input === '')) {
    return true;
  }

  if (!urlValidator.test(inputs.fieldImgUrl)
   || !urlValidator.test(inputs.fieldImdbUrl)) {
    return true;
  }

  return false;
};
