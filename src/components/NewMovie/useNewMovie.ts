import { useMemo } from 'react';
import { useForm } from '../../hooks/useForm';
import { Movie } from '../../types/Movie';
import { AddMovieSchema } from '../../schemas/AddMovieSchema';

interface Props {
  onSubmit: (movie: Movie) => void;
}

export const useNewMovie = ({ onSubmit: callback }: Props) => {
  const initialValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const { count, formValues, formErrors, onChange, handleSubmit } = useForm({
    initialValues,
    validationSchema: AddMovieSchema,
  });

  const isDisabled = useMemo(() => {
    let disabled = false;
    let key: keyof typeof formValues;

    for (key in formValues) {
      if (key === 'description') {
        continue;
      }

      if (!formValues[key].trim()) {
        disabled = true;
      }
    }

    return disabled;
  }, [JSON.stringify(formValues)]);

  const onSubmit = handleSubmit(values => {
    callback(values);
  });

  return {
    count,
    isDisabled,
    movie: formValues,
    formErrors,
    onChange,
    onSubmit,
  };
};
