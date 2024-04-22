import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import cn from 'classnames';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');
  const [descrValue, setDescrValue] = useState('');

  const pattern =
    // eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const notAllInformationGathered =
    titleValue.length === 0 ||
    imdbUrlValue.length === 0 ||
    imdbIdValue.length === 0 ||
    imgUrlValue.length === 0;

  const handlerTitleInput = (value: string) => {
    setTitleValue(value);
  };

  const handlerImageInput = (value: string) => {
    setImgUrlValue(value);
  };

  const handlerImdbUrlInput = (value: string) => {
    setImdbUrlValue(value);
  };

  const handlerImdbIdInput = (value: string) => {
    setImdbIdValue(value);
  };

  const handlerDescrInput = (value: string) => {
    setDescrValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imgUrlValue.match(pattern) || !imdbUrlValue.match(pattern)) {
      return;
    }

    const newMovie = {
      title: titleValue,
      description: descrValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    onAdd(newMovie);
    setDescrValue('');
    setImdbIdValue('');
    setImdbUrlValue('');
    setImgUrlValue('');
    setTitleValue('');
    setCount(prevState => prevState + 1);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={event => handleSubmit(event)}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={handlerTitleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descrValue}
        onChange={handlerDescrInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={handlerImageInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={handlerImdbUrlInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={handlerImdbIdInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            {...(notAllInformationGathered && { disabled: true })}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
