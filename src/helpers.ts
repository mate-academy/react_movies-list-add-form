export const getInputValidationName = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}Valid`
);

export const getInputFilledName = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}Filled`
);

export const getValidationLoadingName = (name: string) => (
  `${name}ValidationLoading`
);
