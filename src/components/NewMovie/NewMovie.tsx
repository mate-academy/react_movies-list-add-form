import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

// eslint-disable-next-line max-len
const urlIsValid = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const onChange = (name: string, value: string): void => {
    setNewMovie({ ...newMovie, [name]: value });
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    const allInputAreValid = title
      && urlIsValid.test(imgUrl) && urlIsValid.test(imdbUrl) && imdbId;

    if (allInputAreValid) {
      setIsDisabled(false);
    }
  };

  const addMovie = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(movie);
      setCount(prevCount => prevCount + 1);
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setIsDisabled(true);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={onChange}
        required
        valueIsCorrect
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={onChange}
        valueIsCorrect
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={onChange}
        required
        valueIsCorrect={!urlIsValid.test(newMovie.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={onChange}
        required
        valueIsCorrect={!urlIsValid.test(newMovie.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={onChange}
        required
        valueIsCorrect
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
