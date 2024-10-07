import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { NewMovieForm } from '../NewMovieForm/NewMovieForm';

interface Props {
  onAdd: (movie: Movie) => void;
}

const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>(DEFAULT_FORM_VALUES);

  const handleFormValueChange = (newValue: string, formFieldTitle: string) => {
    setFormValues(prevState => {
      return {
        ...prevState,
        [formFieldTitle]: newValue,
      };
    });
  };

  const isErrorsInForm =
    formValues.title.trimStart() &&
    formValues.imdbId.trimStart() &&
    formValues.imgUrl.trimStart() &&
    formValues.imdbUrl.trimStart();

  const handleClearForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isErrorsInForm) {
      return;
    }

    onAdd({ ...formValues });
    setCount(prevState => prevState + 1);
    handleClearForm();
  };

  return (
    <NewMovieForm
      isErrorsInForm={isErrorsInForm}
      formValues={formValues}
      onChange={handleFormValueChange}
      count={count}
      onSubmit={handleSubmit}
      key={count}
    />
  );
};
