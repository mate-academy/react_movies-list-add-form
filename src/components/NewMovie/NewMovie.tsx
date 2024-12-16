import React, { useState } from 'react';
import { TextField } from '../TextField';

interface NewMovieProps {
  onAdd: (newMovie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/+[~%/\\.\\w-_]*)?' +
      '\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,.!/\\\\w]*))?)$',
  );

  const validateUrl = (value: string) => pattern.test(value);

  const checkBlankLines = () => {
    if (
      newMovie.title.trim() == '' ||
      newMovie.imgUrl.trim() == '' ||
      newMovie.imdbUrl.trim() == '' ||
      newMovie.imdbId.trim() == '' ||
      !validateUrl(newMovie.imgUrl) ||
      !validateUrl(newMovie.imdbUrl)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleResetNewMovie = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(current => current + 1);

    handleResetNewMovie();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={inputValue => {
          setNewMovie({
            title: inputValue,
            description: newMovie.description,
            imgUrl: newMovie.imgUrl,
            imdbUrl: newMovie.imdbUrl,
            imdbId: newMovie.imdbId,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={inputValue => {
          setNewMovie({
            title: newMovie.title,
            description: inputValue,
            imgUrl: newMovie.imgUrl,
            imdbUrl: newMovie.imdbUrl,
            imdbId: newMovie.imdbId,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={inputValue => {
          setNewMovie({
            title: newMovie.title,
            description: newMovie.description,
            imgUrl: inputValue,
            imdbUrl: newMovie.imdbUrl,
            imdbId: newMovie.imdbId,
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={inputValue => {
          setNewMovie({
            title: newMovie.title,
            description: newMovie.description,
            imgUrl: newMovie.imgUrl,
            imdbUrl: inputValue,
            imdbId: newMovie.imdbId,
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={inputValue => {
          setNewMovie({
            title: newMovie.title,
            description: newMovie.description,
            imgUrl: newMovie.imgUrl,
            imdbUrl: newMovie.imdbUrl,
            imdbId: inputValue,
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkBlankLines()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
