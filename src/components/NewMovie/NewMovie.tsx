import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const hasMovie = title && imdbUrl && imgUrl && imdbId;
  const isSubmited = hasMovie === '';

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const validation = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

    return pattern.test(url);
  };

  const submitNewMovie = (
    e: React.BaseSyntheticEvent<Event,
    EventTarget & HTMLFormElement, EventTarget>,
  ) => {
    e.preventDefault();

    // validation(imgUrl);
    // validation(imdbUrl);

    if (hasMovie && validation(imgUrl) && validation(imdbUrl)) {
      const newFilm = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newFilm);
      setCount(prev => prev + 1);
      reset();
    }
  };

  const changeTitle = (str: string) => {
    setTitle(str.trim());
  };

  const changeDES = (str: string) => {
    setDescription(str.trim());
  };

  const changeImgUrl = (str: string) => {
    setImgUrl(str.trim());
  };

  const changeImdbUrl = (str: string) => {
    setImdbUrl(str.trim());
  };

  const changeImdbId = (str: string) => {
    setImdbId(str.trim());
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitNewMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={changeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeDES}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={changeImgUrl}
        required
        isValidateUrl={() => validation(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={changeImdbUrl}
        required
        isValidateUrl={() => validation(imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={changeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmited}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
