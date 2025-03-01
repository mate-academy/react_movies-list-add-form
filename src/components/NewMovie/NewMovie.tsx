import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (el: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [errorImg, setErrorImg] = useState(true);
  const [errorImdb, setErrorImdb] = useState(true);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (name: string, value: string) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reset = '';

    setNewMovie({
      title: reset,
      description: reset,
      imgUrl: reset,
      imdbUrl: reset,
      imdbId: reset,
    });
    setCount(prev => prev + 1);

    onAdd(newMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        required
        onChange={value => handleChange('title', value)}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => {
          handleChange('imgUrl', value);
          setErrorImg(pattern.test(value));
        }}
        error={errorImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => {
          handleChange('imdbUrl', value);
          setErrorImdb(pattern.test(value));
        }}
        error={errorImdb}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={value => handleChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              [...Object.values(newMovie)].find(el => el.trim() === '') ||
              !errorImg ||
              !errorImdb
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
