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

  const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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

  const handlerDescriptionChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      description: currentValue,
    }));
  };

  const handlerImageUrlChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      imageUrl: currentValue,
    }));
  };

  const handlerImdbUrlChange = (currentValue: string) => {
    setInputFields((prevState) => ({
      ...prevState,
      imdbUrl: currentValue,
    }));
  };

  const handlerImdbIdChange = (currentValue: string) => {
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
      onSubmit={onFormSubmitHandler}
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
        onChange={handlerDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputFields.imageUrl}
        onChange={handlerImageUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputFields.imdbUrl}
        onChange={handlerImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputFields.imdbId}
        onChange={handlerImdbIdChange}
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
