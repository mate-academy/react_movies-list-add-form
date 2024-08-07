import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imageUrlValue, setImageUrlValue] = useState('');
  const [imdbValue, setImdbValue] = useState('');
  const [imbdIdValue, setImdbIdValue] = useState('');

  const isButtonDisabled = !(
    titleValue.trim() &&
    imdbValue.trim() &&
    imageUrlValue.trim() &&
    imbdIdValue.trim()
  );

  const reset = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImageUrlValue('');
    setImdbValue('');
    setImdbIdValue('');
    setCount(prev => prev + 1);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imageUrlValue,
      imdbUrl: imdbValue,
      imdbId: imbdIdValue,
    });

    reset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrlValue}
        onChange={setImageUrlValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbValue}
        onChange={setImdbValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdIdValue}
        onChange={setImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
