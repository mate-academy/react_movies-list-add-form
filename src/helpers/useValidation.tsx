import { useEffect } from 'react';
import { Validity } from '../types/Validity';

export default function useValidation(
  validity: Validity, setSubmit: (disabled: boolean) => void,
) {
  const validCount
    = Object.values(validity)
      .reduce((a: number, item) => a + Number(item), 0);

  useEffect(() => {
    const disabled = validCount !== Object.keys(validity).length;

    setSubmit(disabled);
  }, [validCount]);
}
