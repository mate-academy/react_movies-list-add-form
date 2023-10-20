import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const defaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieInfo, setMovieInfo] = useState<Movie>(defaultState);

  const isAbleToSubmit = movieInfo.title && movieInfo.imgUrl
  && movieInfo.imdbUrl && movieInfo.imdbId;

  const handleAddNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    movieInfo.title.trim();
    movieInfo.description.trim();
    movieInfo.imgUrl.trim();
    movieInfo.imdbUrl.trim();
    movieInfo.imdbId.trim();

    onAdd(movieInfo);

    setMovieInfo(defaultState);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        onChange={(newTitle) => setMovieInfo({ ...movieInfo, title: newTitle })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
        onChange={(newDescription) => setMovieInfo({
          ...movieInfo,
          description: newDescription,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        onChange={(newimgUrl) => setMovieInfo({
          ...movieInfo,
          imgUrl: newimgUrl,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        onChange={(newimdbUrl) => setMovieInfo({
          ...movieInfo,
          imdbUrl: newimdbUrl,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        onChange={(newimdbId) => setMovieInfo({
          ...movieInfo,
          imdbId: newimdbId,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddNewMovie}
            disabled={!isAbleToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
