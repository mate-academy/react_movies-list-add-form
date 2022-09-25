import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isError, setError] = useState(true);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  useEffect(() => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    if (title.trim()
      && pattern.test(imgUrl)
      && pattern.test(imdbUrl)
      && imdbId) {
      setError(false);
    } else {
      setError(true);
    }
  }, [newMovie]);

  const onChange = (field: string, value: string) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount((prevCount) => prevCount + 1);
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
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={newMovie.imgUrl}
        onChange={onChange}
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newMovie.imdbUrl}
        onChange={onChange}
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newMovie.imdbId}
        onChange={onChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
