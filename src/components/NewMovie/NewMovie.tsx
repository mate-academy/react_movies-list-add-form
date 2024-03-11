import { ChangeEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState(initialMovie);

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie((prevMovie: Movie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const isDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleReset = () => {
    setMovie(initialMovie);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    onAdd({
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    });
    setCount(prevCount => prevCount + 1);
    handleReset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleFormDataChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleFormDataChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleFormDataChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleFormDataChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleFormDataChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
