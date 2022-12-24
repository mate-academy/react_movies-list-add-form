import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [currentTitleValue, setCurrentTitleValue] = useState('');
  const [currentDescriptionValue, setCurrentDescriptionValue] = useState('');
  const [currentImgUrlValue, setCurrentImgUrlValue] = useState('');
  const [currentImdbUrlValue, setCurrentImdbUrlValue] = useState('');
  const [currentImdbIdValue, setCurrentImdbIdValue] = useState('');

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isImgUrlValid = pattern.test(currentImgUrlValue);
    const isImdbUrlValid = pattern.test(currentImdbUrlValue);
    const invalidUrlMessage = 'Invalid URL';

    if (!isImgUrlValid) {
      setCurrentImgUrlValue(invalidUrlMessage);

      return;
    }

    if (!isImdbUrlValid) {
      setCurrentImdbUrlValue(invalidUrlMessage);

      return;
    }

    const newMovie: Movie = {
      title: currentTitleValue,
      description: currentDescriptionValue,
      imgUrl: currentImgUrlValue,
      imdbUrl: currentImdbUrlValue,
      imdbId: currentImdbIdValue,
    };

    onAdd(newMovie);

    setCurrentTitleValue('');
    setCurrentDescriptionValue('');
    setCurrentImgUrlValue('');
    setCurrentImdbUrlValue('');
    setCurrentImdbIdValue('');
    setCount(currentCount => currentCount + 1);
  };

  const handleTitleChange = (text: string) => {
    setCurrentTitleValue(text);
  };

  const handleDescriptionChange = (text: string) => {
    setCurrentDescriptionValue(text);
  };

  const handleImgUrlChange = (text: string) => {
    setCurrentImgUrlValue(text);
  };

  const handleImdbUrlChange = (text: string) => {
    setCurrentImdbUrlValue(text);
  };

  const handleImdbIdChange = (text: string) => {
    setCurrentImdbIdValue(text);
  };

  const isButtonAddActive = currentTitleValue
    && currentImgUrlValue
    && currentImdbUrlValue
    && currentImdbIdValue;

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
        value={currentTitleValue}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={currentDescriptionValue}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={currentImgUrlValue}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={currentImdbUrlValue}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={currentImdbIdValue}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonAddActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
