export const isInputsFilled = (arrOfInputs: string[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arrOfInputs) {
    if (!!item === false) {
      return false;
    }
  }

  return true;
};
