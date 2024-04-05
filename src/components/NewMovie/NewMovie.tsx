import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const setValueTitle = (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      title: newValue,
    }));
  };

  const setValueDescription = (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      description: newValue,
    }));
  };

  const setValueImgUrl = (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      imgUrl: newValue,
    }));
  };

  const setValueImdbUrl = (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      imdbUrl: newValue,
    }));
  };

  const setValueImdbId = (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      imdbId: newValue,
    }));
  };

  const isButtonUse =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isButtonUse) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });
    setValueTitle('');
    setValueDescription('');
    setValueImgUrl('');
    setValueImdbUrl('');
    setValueImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={val => {
          setValueTitle(val);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={val => {
          setValueDescription(val);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={val => {
          setValueImgUrl(val);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={val => {
          setValueImdbUrl(val);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={val => {
          setValueImdbId(val);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonUse}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
