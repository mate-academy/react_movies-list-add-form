/* eslint-disable no-console */
import { useEffect } from 'react';
import { Validity } from '../types/Validity';

export default function useValidation(
  validityData: Validity, setSubmitDisabled: (status: boolean) => void,
) {
  const validCount
    = Object.values(validityData)
      .reduce((sum: number, isValid) => sum + Number(isValid), 0);

  useEffect(() => {
    const disable = validCount !== Object.keys(validityData).length;

    setSubmitDisabled(disable);
  }, [validCount]);
}
