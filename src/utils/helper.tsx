export const getRandomDigits = () => Math.random().toString().slice(2);

export const checkIfUrl = (url: string) => {
  const pattern
    // eslint-disable-next-line max-len
    = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

export const prepareLabel = (name: string) => {
  const splitedName = name.split('');
  let label = '';
  let restIsUppercased = false;

  splitedName.forEach(char => {
    if (char.toUpperCase() === char) {
      label += ` ${char.toUpperCase()}`;
      restIsUppercased = true;
    } else if (restIsUppercased) {
      label += char.toUpperCase();
    } else {
      label += char;
    }
  });

  return `${label[0].toUpperCase()}${label.slice(1)}`;
};
