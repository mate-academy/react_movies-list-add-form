import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const verified =
    titleValue && imgUrlValue && imdbUrlValue && imdbIdValue ? true : false;

  const reset = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verified) {
      onAdd({
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      });

      reset();

      setCount(c => c + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        required
        value={titleValue}
        onChange={newValue => setTitleValue(newValue)}
      />

      <TextField
        name="description"
        value={descriptionValue}
        label="Description"
        onChange={newValue => setDescriptionValue(newValue)}
      />

      <TextField
        name="imgUrl"
        value={imgUrlValue}
        label="Image URL"
        onChange={newValue => setImgUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={newValue => setImdbUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={newValue => setImdbIdValue(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!verified}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
