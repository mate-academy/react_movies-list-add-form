import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(
    {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  );

  const clearForm = () => {
    setMovie(
      {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    );
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const isDisabled = (
    title && imgUrl && imdbUrl && imdbId
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onAdd(movie);
        setCount((prevCount => prevCount + 1));
        clearForm();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          setMovie((prevState) => ({ ...prevState, title: value }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setMovie((prevState) => ({ ...prevState, description: value }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(value) => {
          setMovie((prevState) => ({ ...prevState, imgUrl: value.trim() }));
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(value) => {
          setMovie((prevState) => ({ ...prevState, imdbUrl: value.trim() }));
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(value) => {
          setMovie((prevState) => ({ ...prevState, imdbId: value.trim() }));
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
