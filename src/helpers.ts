export const getInputNameOnValidate = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}Valid`
);

export const getInputNameOnBlur = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}ValidOnBlur`
);

export const getInputNameOnFocus = (name: string) => (
  `was${name[0].toUpperCase() + name.slice(1)}Focused`
);
