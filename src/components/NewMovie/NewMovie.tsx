import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [imdbLink, setImdbLink] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValid = () => {
    const isFilled = [title, img, imdbLink, imdbId].every(
      field => field.trim() !== '',
    );

    const isUrlValid = [imdbLink, img].every(field => pattern.test(field));

    return isFilled && isUrlValid;
  };

  const resetStates = (): void => {
    setTitle('');
    setDescription('');
    setImg('');
    setImdbLink('');
    setImdbId('');
  };

  const handleFormSubmission = (event: React.FormEvent): void => {
    event.preventDefault();

    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: img.trim(),
      imdbUrl: imdbLink.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);
    resetStates();
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmission}>
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
        value={img}
        onChange={setImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbLink}
        onChange={setImdbLink}
        required
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
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
