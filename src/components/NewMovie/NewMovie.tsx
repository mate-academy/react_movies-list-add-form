import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const validateUlr = (url: string): boolean => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const getTrimmedValues = () => ({
    title: title.trim(),
    description: description.trim(),
    imgUrl: imgUrl.trim(),
    imdbUrl: imdbUrl.trim(),
    imdbId: imdbId.trim(),
  });

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) =>
      setter(value);

  const trimmedValues = getTrimmedValues();

  const isFormValid = Boolean(
    trimmedValues.title &&
      trimmedValues.imgUrl &&
      trimmedValues.imdbUrl &&
      trimmedValues.imdbId &&
      validateUlr(trimmedValues.imgUrl) &&
      validateUlr(trimmedValues.imdbUrl),
  );

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(getTrimmedValues());

    setCount(prev => prev + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange(setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange(setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={handleChange(setImageUrl)}
        validationCallback={validateUlr}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={handleChange(setImdbUrl)}
        validationCallback={validateUlr}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={handleChange(setImdbId)}
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
