import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setmovieDescription] = useState('');
  const [movieImgUrl, setmovieImgUrl] = useState('');
  const [movieImbdUrl, setmovieImbdUrl] = useState('');
  const [movieImbdId, setmovieImbdId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: movieName,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImbdUrl,
      imdbId: movieImbdId,
    };

    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);
  };

  const formIsValid =
    movieName.trim() !== '' &&
    movieImgUrl.trim() !== '' &&
    movieImbdUrl.trim() !== '' &&
    movieImbdId.trim() !== '';

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieName}
        onChange={value => setMovieName(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={value => setmovieDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgUrl}
        onChange={value => setmovieImgUrl(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImbdUrl}
        onChange={value => setmovieImbdUrl(value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImbdId}
        onChange={value => setmovieImbdId(value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formIsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
