import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieAdd = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieAdd> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const urlPattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSetImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    if (!urlPattern.test(url)) {
      throw new Error('its not a url');
    }

    setImdbUrl(url);
  };

  const handleSetImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    if (!urlPattern.test(url)) {
      throw new Error('its not a url');
    }

    setImgUrl(url);
  };

  const handleSetImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const submitData = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(prevCount => prevCount + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const arrayOfFields = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

  const handleChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    switch (field) {
      case 'title':
        handleSetTitle(event);
        break;
      case 'description':
        handleSetDescription(event);
        break;
      case 'imgUrl':
        handleSetImgUrl(event);
        break;
      case 'imdbUrl':
        handleSetImdbUrl(event);
        break;
      case 'imdbId':
        handleSetImdbId(event);
        break;
      default:
        break;
    }
  };

  const handleChangeField = (field: string) => {
    switch (field) {
      case 'title':
        return title;
      case 'description':
        return description;
      case 'imgUrl':
        return imgUrl;
      case 'imdbUrl':
        return imdbUrl;
      case 'imdbId':
        return imdbId;
      default:
        return;
    }
  };

  const isDisabled = !title || !description || !imgUrl || !imdbUrl || !imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={submitData}>
      <h2 className="title">Add a movie</h2>
      {arrayOfFields.map(field => (
        <TextField
          key={field}
          name={field}
          label={field}
          value={handleChangeField(field)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(field, event)
          }
          required
        />
      ))}

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
