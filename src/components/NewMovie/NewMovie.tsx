import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

interface Props {
  onSubmit: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count] = useState(0);

  const emptyValid =
    !newMovie.title.trim() ||
    !newMovie.imgUrl.trim() ||
    !newMovie.imdbUrl.trim() ||
    !newMovie.imdbId.trim();

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isURL = (input: string) => {
    return pattern.test(input);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (emptyValid) {
      return;
    }

    if (!isURL(newMovie.imgUrl) || !isURL(newMovie.imdbUrl)) {
      return;
    }

    setIsSubmit(true);

    onSubmit(newMovie);

    reset();
  }

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
