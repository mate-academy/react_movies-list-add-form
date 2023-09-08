import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type TNewMovie = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<TNewMovie> = ({ onAdd }) => {
  const initialInputFields = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputFields, setInputFields] = useState(initialInputFields);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(inputFields);

    setInputFields(initialInputFields);

    setCount(prev => prev + 1);
  };

  const handleChange = (currentValue: string, name:string) => {
    setInputFields((prevState) => ({
      ...prevState,
      [name]: currentValue,
    }));
  };

  const isAllFieldValid = Object
    .entries(inputFields)
    .filter(([key]) => key !== 'description')
    .every(([, val]) => val);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputFields.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputFields.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputFields.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputFields.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputFields.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllFieldValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
