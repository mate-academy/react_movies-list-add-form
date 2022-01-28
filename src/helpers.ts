export const getPropertyName = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}Valid`
);

export const getPropertyNameOnBlur = (name: string) => (
  `is${name[0].toUpperCase() + name.slice(1)}ValidOnBlur`
);
