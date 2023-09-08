import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (arg: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const changeTitleHandler = (value: string) => setNewMovie({
    ...newMovie, ...{ title: value },
  });
  const changeDescriptionHandler = (value: string) => setNewMovie({
    ...newMovie, ...{ description: value },
  });
  const changeImgUrlHandler = (value: string) => setNewMovie({
    ...newMovie, ...{ imgUrl: value },
  });
  const changeImdbUrlHandler = (value: string) => setNewMovie({
    ...newMovie, ...{ imdbUrl: value },
  });
  const changeImdbIdHandler = (value: string) => setNewMovie({
    ...newMovie, ...{ imdbId: value },
  });

  const clearFormHandler = () => {
    setNewMovie({
      ...newMovie,
      ...{
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isValidImdbUrl = newMovie.imdbUrl.match(pattern);
  const isValidImgUrl = newMovie.imgUrl.match(pattern);

  let isValidMovie = !!newMovie.title && !!newMovie.imdbId
  && isValidImdbUrl && isValidImgUrl;

  const submitFormHandler: React.FormEventHandler<HTMLFormElement>
  = (event) => {
    event.preventDefault();

    setCount(prevValue => prevValue + 1);
    onAdd(newMovie);
    clearFormHandler();
    isValidMovie = false;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitFormHandler}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={changeTitleHandler}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={changeDescriptionHandler}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={changeImgUrlHandler}
        isValid={!isValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={changeImdbUrlHandler}
        isValid={!isValidImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={changeImdbIdHandler}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
