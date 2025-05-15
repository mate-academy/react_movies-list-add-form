import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [disabled, setDisabled] = useState(true);

  //#region Handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setDisabled(true);
    setCount(prev => prev + 1);
  };

  const validate = (name: string, value: string): string | null => {
    switch (name) {
      case 'title':
        if (!value.trim()) {
          return 'Title is required';
        }

        if (value.trim().length < 2) {
          return 'Title must be at least 2 characters';
        }

        return null;

      case 'description':
        if (!value.trim()) {
          return 'Write some text';
        }

        return null;

      case 'imgUrl':
      case 'imdbUrl': {
        const pattern =
          // eslint-disable-next-line max-len
          /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

        if (!pattern.test(value)) {
          return `Type correct URL for ${name}`;
        }

        return null;
      }

      default:
        return null;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };
  //#endregion Handlers

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie {count}</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        setDisabled={setDisabled}
        required
        validate={validate}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        setDisabled={setDisabled}
        validate={validate}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        setDisabled={setDisabled}
        validate={validate}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        setDisabled={setDisabled}
        validate={validate}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        setDisabled={setDisabled}
        validate={validate}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
