export const ButtonSecurity = (inputs, regex) => {
  const inputsAmount = Array.from(Object.values(inputs));

  if (inputsAmount.some(input => input === '')) {
    return true;
  }

  if (!regex.test(inputs.fieldImgUrl) || !regex.test(inputs.fieldImdbUrl)) {
    return true;
  }

  return false;
};
