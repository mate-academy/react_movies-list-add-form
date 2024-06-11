import { useCallback, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import './NewMovie.scss';
import { Movie } from '../../types/Movie';

type Props = {
  movies: Movie[];
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ movies = [], onAdd }) => {
  const [count, setCount] = useState(0);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isRequiredFieldValid = function (field: string): boolean {
    return !(field.trim() === '');
  };

  const isNewIdValid = useCallback(
    function (id: string): boolean {
      return (
        isRequiredFieldValid(id) && !movies.some(movie => movie.imdbId === id)
      );
    },
    [movies],
  );

  const isUrlValid = function (url: string): boolean {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
    const regex = new RegExp(pattern);

    return regex.test(url);
  };

  useEffect(() => {
    const urls = [imgUrl, imdbUrl];

    setButtonIsDisabled(
      !isRequiredFieldValid(title) ||
        !isNewIdValid(imdbId) ||
        urls.some(url => !isUrlValid(url)),
    );
  }, [title, imgUrl, imdbUrl, imdbId, isNewIdValid]);

  const resetInputs = function () {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmit = function (event: React.FormEvent) {
    event.preventDefault();
    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
    resetInputs();
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        isValid={isRequiredFieldValid}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        isValid={isUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        isValid={isUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        isValid={isNewIdValid}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonIsDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
