import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const emptyMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movieDetails, setMovieDetails] = useState(emptyMovie);

  const isValidated = (
    movieDetails.title
    && movieDetails.imgUrl
    && movieDetails.imdbUrl
    && movieDetails.imdbId
  );

  const reset = () => {
    setMovieDetails(emptyMovie);
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movieDetails);
    reset();
  };

  const handleInputChange = (value: string, name: string) => {
    setMovieDetails({
      ...movieDetails,
      [name]: value,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      {isValidated && <p>OK</p>}

      <TextField
        name="title"
        label="Title"
        value={movieDetails.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDetails.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieDetails.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieDetails.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieDetails.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidated}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
