export const getInputValidationName = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}Valid`
);

export const getInputFocusedName = (name: string) => (
  `was${name[0].toUpperCase() + name.slice(1)}Focused`
);
