import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlPattern } from '../../variables/urlPattern';
import { DEFAULT_MOVIE_DATA } from '../../variables/DEFAULT_MOVIE_DATA';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState(DEFAULT_MOVIE_DATA);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValues;

  const handleChange = (key: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const checkUrl = (url: string): boolean => (
    urlPattern.test(url)
  );

  const isImgUrlValid = checkUrl(imgUrl);
  const isImdbUrlValid = checkUrl(imdbUrl);

  const clearForm = () => {
    setFormValues(DEFAULT_MOVIE_DATA);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formValues);

    clearForm();

    setCount((prevCount) => prevCount + 1);
  };

  const isSubmitDisabled = !(
    title
    && imgUrl
    && imdbUrl
    && imdbId
    && checkUrl(imgUrl)
    && checkUrl(imdbUrl)
  );

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
        value={title}
        onChange={(newMovie) => handleChange('title', newMovie)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => handleChange(
          'description', newDescription,
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl) => handleChange('imgUrl', newImgUrl)}
        required
        isUrlValid={isImgUrlValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newImdbUrl) => handleChange('imdbUrl', newImdbUrl)}
        required
        isUrlValid={isImdbUrlValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId) => handleChange('imdbId', newImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
