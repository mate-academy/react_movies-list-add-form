import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieimdbId, setMovieimdbId] = useState('');
  const isFormValid = movieTitle && movieImgUrl && movieImdbUrl && movieimdbId;
  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieimdbId,
    };

    onAdd(newMovie);

    setMovieTitle('');
    setMovieDescription('');
    setMovieImgUrl('');
    setMovieImdbUrl('');
    setMovieimdbId('');
  };

  return (
    <form className="NewMovie" onSubmit={handleAddMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMovieTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMovieDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMovieImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMovieImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieimdbId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMovieimdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
