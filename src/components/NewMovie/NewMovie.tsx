import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(
    {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  );

  const clearForm = () => {
    setMovie(
      {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    );
  };

  const handleOnChange = (value: string, name: string) => {
    setMovie((prevState) => (
      { ...prevState, [name]: value }));
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const isDisabled = (
    title && imgUrl && imdbUrl && imdbId
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onAdd(movie);
        setCount((prevCount => prevCount + 1));
        clearForm();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl.trim()}
        required
        onChange={handleOnChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl.trim()}
        required
        onChange={handleOnChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId.trim()}
        required
        onChange={handleOnChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
