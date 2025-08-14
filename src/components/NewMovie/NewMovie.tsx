import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieInput, setMovieInput] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // ✅ Регулярка для проверки URL
  const urlRegex = /^(https?:\/\/)([\w\-]+(\.[\w\-]+)+)([^\s]*)$/;
  const validateUrl = (value: string) => urlRegex.test(value);

  function handleTitleChange(newValue: string) {
    setMovieInput(input => ({
      ...input,
      title: newValue,
    }));
  }

  function handleDescriptionChange(newValue: string) {
    setMovieInput(input => ({
      ...input,
      description: newValue,
    }));
  }

  function handleImgUrlChange(newValue: string) {
    setMovieInput(input => ({
      ...input,
      imgUrl: newValue,
    }));
  }

  function handleImdbUrlChange(newValue: string) {
    setMovieInput(input => ({
      ...input,
      imdbUrl: newValue,
    }));
  }

  function handleImdbIdChange(newValue: string) {
    setMovieInput(input => ({
      ...input,
      imdbId: newValue,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(movieInput);
    setCount(count + 1);
    setMovieInput({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  }

  function disableButton() {
    for (const key of Object.keys(movieInput)) {
      if (
        key !== 'description' &&
        !movieInput[key as keyof typeof movieInput].trim()
      ) {
        return true;
      }
    }

    return false;
  }

  const isDisabled = disableButton();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInput.title}
        onChange={(newValue: string) => handleTitleChange(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInput.description}
        onChange={(newValue: string) => handleDescriptionChange(newValue)}
      />

      {/* ✅ Добавили validate */}
      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInput.imgUrl}
        onChange={(newValue: string) => handleImgUrlChange(newValue)}
        required
        validate={validateUrl}
      />

      {/* ✅ Добавили validate */}
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInput.imdbUrl}
        onChange={(newValue: string) => handleImdbUrlChange(newValue)}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInput.imdbId}
        onChange={(newValue: string) => handleImdbIdChange(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
