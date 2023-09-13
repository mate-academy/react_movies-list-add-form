import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imdbId: '',
    imgUrl: '',
    imdbUrl: '',
    isImgUrlValid: true,
    isImdbUrlValid: true,
  });

  const {
    title,
    description,
    imdbId,
    imgUrl,
    imdbUrl,
    isImgUrlValid,
    isImdbUrlValid,
  } = inputs;

  const isDisabled = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim()
    || !isImgUrlValid
    || !isImdbUrlValid;

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleImgUrlChange = (event: string) => {
    setInputs({
      ...inputs,
      imgUrl: event,
      isImgUrlValid: pattern.test(event.trim()),
    });
  };

  const handleImdUrlChange = (event: string) => {
    setInputs({
      ...inputs,
      imdbUrl: event,
      isImdbUrlValid: pattern.test(event.trim()),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);

    setInputs({
      title: '',
      description: '',
      imdbId: '',
      imgUrl: '',
      imdbUrl: '',
      isImgUrlValid: true,
      isImdbUrlValid: true,
    });
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
        value={title}
        onChange={value => setInputs({
          ...inputs,
          title: value,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setInputs({
          ...inputs,
          description: value,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        isUrlValid={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdUrlChange}
        isUrlValid={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setInputs({
          ...inputs,
          imdbId: value,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
