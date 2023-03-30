import React, { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const checkUrl = (url: string) => {
    return (url.match(pattern) || [])[0] === url;
  };

  const clearData = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const isDisableBtn = !title.trim()
    || !imgUrl
    || !checkUrl(imgUrl)
    || !checkUrl(imdbUrl)
    || !imdbUrl
    || !imdbId
    || !description.trim();

  const handlerOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);
    onAdd(movie);
    clearData();
  };

  const onChange = (name: string, value: string) => {
    setMovie(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        required
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        isValid={checkUrl}
        onChange={onChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        isValid={checkUrl}
        onChange={onChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={onChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisableBtn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
