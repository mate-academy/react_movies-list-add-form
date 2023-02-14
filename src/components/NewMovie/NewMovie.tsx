import { FC, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Input, Submit } from '../../types/events';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isDataMovie, setIsDataMovie] = useState(false);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  useEffect(() => {
    if (
      !!newMovie.title
      && !!newMovie.imgUrl
      && !!newMovie.imdbUrl
      && !!newMovie.imdbId
    ) {
      setIsDataMovie(true);

      return;
    }

    setIsDataMovie(false);
  }, [
    newMovie.title,
    newMovie.imgUrl,
    newMovie.imdbUrl,
    newMovie.imdbId,
  ]);

  const clearFields = () => setNewMovie({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: Input) => {
    const { name, value } = event.target;

    setNewMovie((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: Submit) => {
    e.preventDefault();

    if (!newMovie.imgUrl.match(pattern) || !newMovie.imdbUrl.match(pattern)) {
      alert('Check URLs');

      return;
    }

    onAdd(newMovie);
    setCount(prev => prev + 1);
    clearFields();
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
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
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
            disabled={!isDataMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
