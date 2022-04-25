export const isFieldRequired = {
  value: true,
  message: 'This field is required',
};

export const isValidUrl = {
  // eslint-disable-next-line
  value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
  message: 'Please enter valid URL',
};

export const minSymbol = (value: number) => ({
  value,
  message: `Min ${value} characters`,
});
