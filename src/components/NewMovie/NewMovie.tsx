import { useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type Props = {
  onAdd:(tab: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const {
    title, imgUrl, imdbUrl, imdbId, description,
  } = movie;

  const isFormValid = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(movie);

    setCount(newCount => newCount + 1);

    setMovie(({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  const handleChange = (
    event: { target: { name: string; value: string; }; },
  ) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
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
        onChange={(event) => {
          handleChange(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          handleChange(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          handleChange(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          handleChange(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          handleChange(event);
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
