import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ addMovie }:{ addMovie: (movie: Movie) => void }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  /* eslint-enable */

  const state = formState.title.trim()
    && formState.imgUrl
    && formState.imdbUrl
    && formState.imdbId
    && pattern.test(formState.imgUrl)
    && pattern.test(formState.imdbUrl);

  const refresh = () => {
    const newMovie = {
      title: formState.title,
      description: formState.description,
      imgUrl: formState.imgUrl,
      imdbUrl: formState.imdbUrl,
      imdbId: formState.imdbId,
    };

    addMovie(newMovie);

    setFormState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={(newValue) => setFormState({
          ...formState, title: newValue,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={(newValue) => setFormState({
          ...formState, description: newValue,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={(newValue) => setFormState({
          ...formState, imgUrl: newValue,
        })}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={(newValue) => setFormState({
          ...formState, imdbUrl: newValue,
        })}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={(newValue) => setFormState({
          ...formState, imdbId: newValue,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={refresh}
            disabled={!state}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
