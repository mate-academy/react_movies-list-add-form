import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlisValid, setimgUrlisValid] = useState(false);
  const [imdbUrlisValid, setimdbUrlisValid] = useState(false);

  const requiredFields = [title, imgUrl, imdbUrl, imdbId];
  const validFields = [imgUrlisValid, imdbUrlisValid];

  function fieldsAreFilled(fields: string[]) {
    return fields.every(field => field.trim() !== '');
  }

  function fieldsAreValid(fields: boolean[]) {
    return fields.every(field => field === true);
  }

  function reset() {
    setTitle('');
    setDesc('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  }

  const handleSubmit = () => {
    onAdd({
      title,
      imgUrl,
      imdbId,
      imdbUrl,
      description: desc,
    });

    setCount(count + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle => setTitle(newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={desc}
        onChange={newDesc => setDesc(newDesc)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newImgUrl => setImgUrl(newImgUrl)}
        validator={(value: string, pattern: RegExp) => {
          if (pattern.test(value)) {
            setimgUrlisValid(true);

            return true;
          }

          setimgUrlisValid(false);

          return false;
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newImdbUrl => setImdbUrl(newImdbUrl)}
        validator={(value: string, pattern: RegExp) => {
          if (pattern.test(value)) {
            setimdbUrlisValid(true);

            return true;
          }

          setimdbUrlisValid(false);

          return false;
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newImdbId => setImdbId(newImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !fieldsAreFilled(requiredFields) ||
              (fieldsAreFilled(requiredFields) && !fieldsAreValid(validFields))
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
