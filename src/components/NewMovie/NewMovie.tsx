import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type TNewMovie = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<TNewMovie> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputFields, setInputFields] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: inputFields.title,
      description: inputFields.description,
      imgUrl: inputFields.imageUrl,
      imdbUrl: inputFields.imdbUrl,
      imdbId: inputFields.imdbId,
    });

    setInputFields({
      title: '',
      description: '',
      imageUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  const handleTitleChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      title: currentValue,
    }));
  };

  const handleDescriptionChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      description: currentValue,
    }));
  };

  const handleImageUrlChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      imageUrl: currentValue,
    }));
  };

  const handleImdbUrlChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      imdbUrl: currentValue,
    }));
  };

  const handleImdbIdChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      imdbId: currentValue,
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
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputFields.description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputFields.imageUrl}
        onChange={handleImageUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputFields.imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputFields.imdbId}
        onChange={handleImdbIdChange}
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
