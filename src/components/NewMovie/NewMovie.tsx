import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie)=>void
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const defaultMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [userMovie, setUserMovie] = useState(defaultMovie);

  const {
    title, description, imdbId, imdbUrl, imgUrl,
  } = userMovie;

  const formIsValid = title && imdbId && imdbUrl && imgUrl;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const key = target.id.slice(0, target.id.indexOf('-'));

    setUserMovie((prevMovie) => ({ ...prevMovie, [key]: target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(userMovie);
    setCount((prev) => prev + 1);
    setUserMovie(defaultMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={changeHandler}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeHandler}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={changeHandler}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={changeHandler}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={changeHandler}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formIsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
