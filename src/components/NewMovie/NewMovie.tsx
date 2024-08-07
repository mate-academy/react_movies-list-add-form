import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

import { Movie, StringWithValidation } from '../../types';

import { isUrl } from '../../utils/isUrl';

type Props = {
  onAdd?: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState<StringWithValidation>({
    value: '',
    isValid: false,
  });
  const [description, setDescription] = useState<StringWithValidation>({
    value: '',
    isValid: false,
  });
  const [imgUrl, setImgUrl] = useState<StringWithValidation>({
    value: '',
    isValid: false,
  });
  const [imdbUrl, setImdbUrl] = useState<StringWithValidation>({
    value: '',
    isValid: false,
  });
  const [imdbId, setImdbId] = useState<StringWithValidation>({
    value: '',
    isValid: false,
  });

  const fields = [title, description, imgUrl, imdbUrl, imdbId];
  const areFieldsValid = fields.every(field => field.isValid);

  const reset = () => {
    setTitle({ value: '', isValid: false });
    setDescription({ value: '', isValid: false });
    setImgUrl({ value: '', isValid: false });
    setImdbUrl({ value: '', isValid: false });
    setImdbId({ value: '', isValid: false });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!areFieldsValid) {
      return;
    }

    const movie: Movie = {
      title: title.value.trim(),
      description: description.value.trim(),
      imgUrl: imgUrl.value.trim(),
      imdbUrl: imdbUrl.value.trim(),
      imdbId: imdbId.value.trim(),
    };

    onAdd(movie);

    reset();

    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>
      <TextField
        onChange={(value, isValid) => setTitle({ value, isValid })}
        name="title"
        label="Title"
        value={title.value}
        required
      />

      <TextField
        onChange={(value, isValid) => setDescription({ value, isValid })}
        name="description"
        label="Description"
        value={description.value}
      />

      <TextField
        onChange={(value, isValid) => setImgUrl({ value, isValid })}
        name="imgUrl"
        label="Image URL"
        value={imgUrl.value}
        inputValidator={value =>
          isUrl(value) ? '' : `${value} is not a valid url`
        }
        required
      />

      <TextField
        onChange={(value, isValid) => setImdbUrl({ value, isValid })}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl.value}
        inputValidator={value =>
          isUrl(value) ? '' : `${value} is not a valid url`
        }
        required
      />

      <TextField
        onChange={(value, isValid) => setImdbId({ value, isValid })}
        name="imdbId"
        label="Imdb ID"
        value={imdbId.value}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areFieldsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
