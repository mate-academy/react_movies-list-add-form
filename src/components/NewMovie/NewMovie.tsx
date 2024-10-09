import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKeyCount, setFormKeyCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  const isVerify = movieTitle && imgUrlValue && imdbUrlValue && movieImdbId;

  const reset = () => {
    setMovieTitle('');
    setMovieDescription('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setMovieImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isVerify) {
      onAdd({
        title: movieTitle,
        description: movieDescription,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: movieImdbId,
      });
      reset();
      setFormKeyCount(() => formKeyCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={formKeyCount} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={newTitleValue => {
          setMovieTitle(newTitleValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={newDescriptionValue => {
          setMovieDescription(newDescriptionValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={newImgUrlValue => {
          setImgUrlValue(newImgUrlValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={newImdbUrlValue => {
          setImdbUrlValue(newImdbUrlValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={newImdbIdValue => {
          setMovieImdbId(newImdbIdValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isVerify}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
