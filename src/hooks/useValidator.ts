import { useEffect, useMemo, useRef } from 'react';
import { PublicValidator, Validator } from '../utils/Validator';

export const useValidator = (
  value: string,
  callback: (validator: PublicValidator) => void,
) => {
  const optimizedCallback = useRef(callback);

  useEffect(() => {
    optimizedCallback.current = callback;
  }, [callback]);

  return useMemo(() => {
    const validator = new Validator(value);

    optimizedCallback.current(validator);

    return validator.getResult();
  }, [value]);
};
