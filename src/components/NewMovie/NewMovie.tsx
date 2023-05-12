import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

const IMDB_PATTERN = /^https?:\/\/(?:www\.)?imdb\.com\/title\/tt\d{7}\/?$/i;
const IMAGE_PATTERN = /^https?:\/\/.+\/(.+)\.(jpe?g|png|gif)$/i;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [isValidForm, setIsValidForm] = useState(false);

  const [count, setCount] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setIsValidForm(false);

    setCount(count + 1);
  };

  const handleValidation = () => {
    setIsValidForm(
      movie.title.trim() !== ''
        && (movie.description === '' || movie.description.trim() !== '')
        && (movie.imgUrl.trim() !== '' || IMAGE_PATTERN.test(movie.imdbUrl))
        && (movie.imdbUrl.trim() !== '' || IMDB_PATTERN.test(movie.imdbUrl))
        && movie.imdbId.trim() !== '',
    );
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(newValue: string) => {
          setMovie((prevState) => ({ ...prevState, title: newValue }));
        }}
        onBlur={handleValidation}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newValue: string) => {
          setMovie((prevState) => ({ ...prevState, description: newValue }));
        }}
        onBlur={handleValidation}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newValue: string) => {
          setMovie((prevState) => ({ ...prevState, imgUrl: newValue }));
        }}
        pattern={IMAGE_PATTERN}
        onBlur={handleValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newValue: string) => {
          setMovie((prevState) => ({ ...prevState, imdbUrl: newValue }));
        }}
        pattern={IMDB_PATTERN}
        onBlur={handleValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newValue: string) => {
          setMovie((prevState) => ({ ...prevState, imdbId: newValue }));
        }}
        onBlur={handleValidation}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
