import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { event } from 'cypress/types/jquery';

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

  const handleOnChenge = (name: string, value: string) => {
    setMovie((prevState) => ({ ...prevState, [name]: value }));
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
        onChange={(event: string) => handleOnChenge('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event: string) => handleOnChenge('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl.trim()}
        required
        onChange={(event: string) => handleOnChenge('imgUrl', event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl.trim()}
        required
        onChange={(event: string) => handleOnChenge('imdbUrl', event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId.trim()}
        required
        onChange={(event: string) => handleOnChenge('imdbId', event)}
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
