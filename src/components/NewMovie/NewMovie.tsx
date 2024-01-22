import { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: (
    movie: {
      title: string,
      description: string,
      imgUrl: string,
      imdbUrl: string,
      imdbId: string,
    }
  ) => void
}

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

  const urlValidator = (urlString: string): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!urlString.match(pattern)) {
      return false;
    }

    return true;
  };

  const isDisabled = !newMovie.title.trim()
  || !urlValidator(newMovie.imgUrl) || !urlValidator(newMovie.imdbUrl)
  || !newMovie.imdbId.trim();

  function addMovie(event: React.FormEvent) {
    event.preventDefault();

    onAdd({
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
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
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        value={newMovie.imgUrl}
        onChange={handleChange}
        checkUrl={urlValidator}
        required
      />

      <TextField
        name="imdbUrl"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        checkUrl={urlValidator}
        required
      />

      <TextField
        name="imdbId"
        value={newMovie.imdbId}
        onChange={handleChange}
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
