import { movieConfig } from '../constants';

export const initialValues = movieConfig.reduce((acc, name) => {
  return {
    ...acc,
    [name]: '',
  };
}, {});

export const initialErrors = movieConfig.reduce((acc, name) => {
  return {
    ...acc,
    [name]: null,
  };
}, {});
