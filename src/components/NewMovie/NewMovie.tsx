import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie:Movie) => void
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovieInfo, setNewMovieInfo] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovieInfo;

  const handleChange = (name:string, value:string) => {
    setNewMovieInfo(prevData => (
      {
        ...prevData,
        [name]: value,
      }
    ));
  };

  const reset = () => {
    setNewMovieInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd(newMovieInfo);

    setCount(prevCount => prevCount + 1);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(name, value) => handleChange(name, value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(name, value) => handleChange(name, value)}
        required

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

// 1. `NewMovie` should check if `title`, `imgUrl`, `imdbUrl`, `imdbId` are
// entered when an input looses focus (`onBlur`) and show an error and a red
// border if needed (learn how it it implemented in the `TextField`);
// 1. The `description` is optional;
// 1. Disable the submit button until all the required fields are filled (spaces should be trimmed);
// 1. Clear the form after adding a new movie.
// 1. Errors should not be shown after clearing the form (change its key to
// reinitialize the form);
