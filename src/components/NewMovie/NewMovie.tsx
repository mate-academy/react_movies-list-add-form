import React, { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../helpers/isValidUrl';
import { Props } from './NewMovie.types';

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const resetAll = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const isImdbUrlValid = isValidUrl(imgUrlValue);
  const isImgUrlValid = isValidUrl(imgUrlValue);

  const isSubmitAllowed
    = titleValue && imgUrlValue && imdbUrlValue
    && imdbIdValue && isImdbUrlValid && isImgUrlValid;

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitAllowed) {
      const newMovie: Movie = {
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      };

      onAdd(newMovie);
      setCount(prevCount => prevCount + 1);
      resetAll();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onFormSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(newTitleValue) => {
          setTitleValue(newTitleValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(newDescriptionValue) => {
          setDescriptionValue(newDescriptionValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(newImgUrlValue) => {
          setImgUrlValue(newImgUrlValue);
        }}
        isValidUrl={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={(newImdbUrlValue) => {
          setImdbUrlValue(newImdbUrlValue);
        }}
        isValidUrl={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(newImdbIdValue) => {
          setImdbIdValue(newImdbIdValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmitAllowed}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
