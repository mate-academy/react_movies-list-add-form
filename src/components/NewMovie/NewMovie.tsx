import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { URL_PATTERN } from '../../api/url_patterns';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  const isValidForm =
    newMovie.title.trim() &&
    URL_PATTERN.test(newMovie.imgUrl.trim()) &&
    URL_PATTERN.test(newMovie.imdbUrl.trim()) &&
    newMovie.imdbId.trim();

  let disabled = true;

  if (isValidForm) {
    disabled = false;
  }

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const onSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm) {
      return;
    }

    setCount(current => current + 1);
    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSumbitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setNewMovie({ ...newMovie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setNewMovie({ ...newMovie, imgUrl: value })}
        pattern
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
        pattern
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
