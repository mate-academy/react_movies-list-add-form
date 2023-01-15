import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const defaultValue = '';
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(defaultValue);
  const [description, setDescription] = useState(defaultValue);
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const [imdbUrl, setImdbUrl] = useState(defaultValue);
  const [imdbId, setImdbId] = useState(defaultValue);

  const isFormFilled
  = title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const increaseAmountOfMovies = () => {
    setCount(currCount => currCount + 1);
  };

  const handleFormClean = () => {
    setTitle(defaultValue);
    setDescription(defaultValue);
    setImgUrl(defaultValue);
    setImdbUrl(defaultValue);
    setImdbId(defaultValue);
  };

  const handleSubmit = () => {
    if (isFormFilled) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      increaseAmountOfMovies();
      handleFormClean();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
