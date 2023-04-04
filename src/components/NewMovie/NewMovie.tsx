import React, { useState, ChangeEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const trimText = (text: string) => (
    text[0] === ' ' ? text.trim() : text
  );
  const [count, setCount] = useState(0);

  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(true);
  const validator = (url: string) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-  +=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return false;
    }

    return true;
  };

  const [statee, setState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...statee, [event.target.name]: trimText(event.target.value) });
  };

  const clearForm = () => {
    setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const addMovie = (event: React.SyntheticEvent) => {
    const movie: Movie = {
      title: statee.title,
      description: statee.description,
      imgUrl: statee.imgUrl,
      imdbUrl: statee.imdbUrl,
      imdbId: statee.imdbId,
    };

    event.preventDefault();

    setIsValidImgUrl(validator(statee.imgUrl));
    setIsValidImdbUrl(validator(statee.imdbUrl));

    if (validator(statee.imgUrl) && validator(statee.imdbUrl)) {
      onAdd(movie);
      setCount(current => current + 1);

      clearForm();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={statee.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={statee.description}
        onChange={onChange}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={statee.imgUrl}
        onChange={(event) => {
          onChange(event);
          setIsValidImgUrl(true);
        }}
        required
        validation={isValidImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={statee.imdbUrl}
        onChange={(event) => {
          onChange(event);
          setIsValidImdbUrl(true);
        }}
        required
        validation={isValidImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={statee.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={(
              statee.title === ''
              || statee.imgUrl === ''
              || statee.imdbUrl === ''
              || statee.imdbId === ''
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
