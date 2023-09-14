import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialInput = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(initialInput);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isDisabled = title.trim() !== ''
    || imdbId.trim() !== ''
    || imdbUrl.trim() !== ''
    || imgUrl.trim() !== '';

  const pattern = /^(https?:\/\/)?(www\.)?[A-Za-z\d.-]+\.\w{2,6}\/?([^\s]*)?$/;
  const isValidUrl = pattern.test(imdbUrl)
  && pattern.test(imgUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handlSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount((currentCount) => currentCount + 1);
    setNewMovie(initialInput);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
      />

      {isValidUrl && (
        <p className="help is-danger">{`Please enter valid URL for ${imgUrl}`}</p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
      />

      {isValidUrl && (
        <p className="help is-danger">{`Please enter valid URL for ${imdbUrl}`}</p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
