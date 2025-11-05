import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { getTrimmedValue } from '../../helpers/getTrimmedValue';
import { validateUrl } from '../../helpers/validateUrl';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isAllFieldsValid =
    getTrimmedValue(title) !== '' &&
    getTrimmedValue(imdbId) !== '' &&
    validateUrl(getTrimmedValue(imgUrl)) &&
    validateUrl(getTrimmedValue(imdbUrl));

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAllFieldsValid) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onAdd(newMovie);
    handleClearForm();
    setCount(curCount => curCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        validationCallback={validateUrl}
        onChange={newValue => setImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        validationCallback={validateUrl}
        onChange={newValue => setImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllFieldsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
