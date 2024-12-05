import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { FormState } from '../../types/FormState';
import { MovieForm } from '../MovieForm/MovieForm';

type Props = {
  onAdd: (movie: Movie) => void;
};

const INITIAL_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formState, setFormState] = useState<FormState>(INITIAL_VALUES);

  const reset = () => {
    setFormState(INITIAL_VALUES);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formState);
    setCount(current => current + 1);
    reset();
  };

  const isDisabled =
    !formState.title.trim() ||
    !formState.imgUrl.trim() ||
    !formState.imdbUrl.trim() ||
    !formState.imdbId.trim();

  const updateField = (field: string, value: string) => {
    setFormState(current => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <MovieForm
      updateField={updateField}
      handleSubmit={handleSubmit}
      isDisabled={isDisabled}
      count={count}
      formState={formState}
    />
  );
};
