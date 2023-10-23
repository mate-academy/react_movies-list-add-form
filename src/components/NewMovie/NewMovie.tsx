import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const moviesState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(moviesState);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const invalid = !title
    || !imgUrl
    || !imdbUrl
    || !imdbUrl
    || !imdbId;

  const isValidForm = title.trim() !== ''
  && imgUrl.trim() !== ''
  && imdbUrl.trim() !== ''
  && imdbId.trim() !== '';

  const handleReset = () => {
    setMovie(moviesState);
  };

  const handleChangeInput = (key: string, value: string) => {
    setMovie((prevInput) => ({ ...prevInput, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidForm) {
      return;
    }

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });
    setCount((value) => value + 1);
    handleReset();
  };

  return (

    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handleChangeInput('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleChangeInput('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleChangeInput('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleChangeInput('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleChangeInput('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={invalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
