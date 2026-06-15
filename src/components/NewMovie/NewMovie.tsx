import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../App';

interface Props {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
}

const URL_PATTERN = new RegExp(
  [
    '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|',
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
    '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  ].join(''),
);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const validateUrl = (value: string) => {
    if (!value.trim()) {
      return 'Поле обов’язкове для заполнення';
    }

    if (!URL_PATTERN.test(value)) {
      return 'Введіть коректний URL-адрес';
    }

    return '';
  };

  const isTitleValid = title.trim().length > 0;
  const isImgUrlValid = imgUrl.trim().length > 0 && URL_PATTERN.test(imgUrl);
  const isImdbUrlValid = imdbUrl.trim().length > 0 && URL_PATTERN.test(imdbUrl);
  const isImdbIdValid = imdbId.trim().length > 0;

  const isFormValid =
    isTitleValid && isImgUrlValid && isImdbUrlValid && isImdbIdValid;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setCount(prevCount => prevCount + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
