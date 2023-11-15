import { ChangeEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  addMovie,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value.trim(),
    }));
  };

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    addMovie(movie);
    setCount((prev) => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onInputChange}
      />

      <TextField
        name="img"
        label="Image URL"
        value={imgUrl}
        onChange={onInputChange}
        required
      />

      <TextField
        name="url"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onInputChange}
        required
      />

      <TextField
        name="id"
        label="Imdb ID"
        value={imdbId}
        onChange={onInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={title.length === 0
               || imgUrl.length === 0
               || imdbUrl.length === 0 || imdbId.length === 0}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
