import { Movie } from '../types';

export const trimObjectStrings = (obj: Movie): Movie => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value.trim(),
    };
  }, {} as Movie);
};
