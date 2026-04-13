import { ReactEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { NewMovieProps } from '../../types/Movie';

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleChange = (name: string, newValue: string) => {
    switch (name) {
      case 'title':
        setTitle(newValue);
        break;
      case 'description':
        setDescription(newValue);
        break;
      case 'imgUrl':
        setImgUrl(newValue);
        break;
      case 'imdbUrl':
        setImdbUrl(newValue);
        break;
      case 'imdbId':
        setImdbId(newValue);
        break;
    }
  };

  const requiredFields = [title, imgUrl, imdbUrl, imdbId];
  const isFormValid = requiredFields.every(field => field.trim() !== '');
  const handleSubmit: ReactEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (isFormValid) {
      const newMovie = {
        title: title,
        description: description,
        imgUrl: imgUrl,
        imdbUrl: imdbUrl,
        imdbId: imdbId,
      };

      onAdd(newMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount(prev => prev + 1);
    }
  };

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)$',
  );
  const isValidValue = (value: string) =>
    pattern.test(value) ? null : 'Invalid URL';
  const canSubmit =
    isFormValid &&
    isValidValue(imgUrl) === null &&
    isValidValue(imdbUrl) === null;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        validate={isValidValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        validate={isValidValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
