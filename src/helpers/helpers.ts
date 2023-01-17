export const isInputsFilled = (...arrOfInputs: string[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arrOfInputs) {
    if (!item) {
      return false;
    }
  }

  return true;
};
