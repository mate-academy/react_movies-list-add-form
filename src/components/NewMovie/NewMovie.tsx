import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  const handleMovieTitle = (value: string) => setMovieTitle(value);
  const handleMovieDescription = (value: string) => setMovieDescription(value);
  const handlemovieImgUrl = (value: string) => setMovieImgUrl(value);
  const handleMovieImbdUrl = (value: string) => setMovieImdbUrl(value);
  const handleMovieImbdId = (value: string) => setMovieImdbId(value);
  const resetForm = () => {
    setMovieTitle('');
    setMovieDescription('');
    setMovieImgUrl('');
    setMovieImdbUrl('');
    setMovieImdbId('');
  };

  const isFormValid = movieTitle && movieImgUrl
    && movieImdbUrl && movieImdbId;
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieImdbId,
    };

    if (isFormValid) {
      setCount((prevCount) => prevCount + 1);
      onAdd(newMovie);
    }

    resetForm();
  };

  const isButtonDisabled = !movieTitle || !movieImgUrl
    || !movieImdbUrl || !movieImdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={handleMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={handleMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgUrl}
        onChange={handlemovieImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbUrl}
        onChange={handleMovieImbdUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={handleMovieImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
