/* eslint-disable default-case */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Input } from '../../types/Input';

type Props = {
  onAdd: (
    newMovie: Movie,
    event: React.FormEvent,
    clearFunction: CallableFunction,
  ) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, classList } = event.target;

    switch (name) {
      case Input.title:
        setTitleValue(value);
        break;
      case Input.description:
        setDescriptionValue(value);
        break;
      case Input.imgUrl:
        setImgUrlError(classList.contains('is-danger'));
        setImgUrlValue(value);
        break;
      case Input.imdbUrl:
        setImdbUrlValue(value);
        setImdbUrlError(classList.contains('is-danger'));
        break;
      case Input.imdbId:
        setImdbIdValue(value);
    }
  };

  const newMovie = {
    title: titleValue,
    description: descriptionValue,
    imgUrl: imgUrlValue,
    imdbUrl: imdbUrlValue,
    imdbId: imdbIdValue,
  };

  const clearForm = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
    setCount(current => current + 1);
  };

  const isAble
  = !titleValue
  || !imgUrlValue
  || !imdbUrlValue
  || !imdbIdValue
  || imgUrlError
  || imdbUrlError;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onAdd(newMovie, event, clearForm)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={onChangeInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={onChangeInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={onChangeInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={onChangeInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={onChangeInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAble}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
