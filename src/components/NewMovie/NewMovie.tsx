import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { TextFieldProps } from '../../types/TextFieldProps';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
  validationExpression?: RegExp;
};

export const NewMovie: React.FC<NewMovieProps> = ({
  onAdd,
  validationExpression,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const blankMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(blankMovie);
  const textFieldsData: TextFieldProps[] = [
    {
      id: 1,
      name: 'title',
      label: 'Title',
      value: newMovie.title,
      required: true,
      validation: undefined,
    },
    {
      id: 2,
      name: 'description',
      label: 'Description',
      value: newMovie.description,
      required: false,
      validation: undefined,
    },
    {
      id: 3,
      name: 'imgUrl',
      label: 'Image URL',
      value: newMovie.imgUrl,
      required: true,
      validation: validationExpression,
    },
    {
      id: 4,
      name: 'imdbUrl',
      label: 'Imdb URL',
      value: newMovie.imdbUrl,
      required: true,
      validation: validationExpression,
    },
    {
      id: 5,
      name: 'imdbId',
      label: 'Imdb ID',
      value: newMovie.imdbId,
      required: true,
      validation: undefined,
    },
  ];

  const handleChange = (name: string, newVal: string) => {
    setNewMovie(prevData => ({ ...prevData, [name]: newVal }));
  };

  const checkValidation = (valRegex: RegExp | undefined, value: string) => {
    if (valRegex) {
      return valRegex.test(value);
    }

    return !!value;
  };

  const readyToSumbit = () => {
    const { title, imgUrl, imdbUrl, imdbId } = newMovie;

    return (
      !title.trim() ||
      !imgUrl.trim() ||
      !checkValidation(validationExpression, imgUrl.trim()) ||
      !imdbUrl.trim() ||
      !checkValidation(validationExpression, imdbUrl.trim()) ||
      !imdbId.trim()
    );
  };

  const handleFormReset = () => {
    setNewMovie(blankMovie);
    setCount(prev => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let key: keyof Movie;

    for (key in newMovie) {
      newMovie[key] = newMovie[key].trim();
    }

    onAdd(newMovie);
    handleFormReset();
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {textFieldsData.map(txtFld => {
        return (
          <TextField
            key={txtFld.id}
            name={txtFld.name}
            label={txtFld.label}
            value={txtFld.value}
            required={txtFld.required}
            validation={txtFld.validation}
            onChange={handleChange}
            valCheck={checkValidation}
          />
        );
      })}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={readyToSumbit()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
