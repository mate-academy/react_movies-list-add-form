import { useState } from 'react';

import { Movie } from '../../types/Movie';

import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isButtonDisabled = () => {
    if (title && imgUrl && imdbUrl && imdbId) {
      return false;
    }

    return true;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(inputValue) => {
          setTitle(inputValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(descriptionValue) => {
          setDescription(descriptionValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(imgUrlValue) => {
          setImgUrl(imgUrlValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(imdbUrlValue) => {
          setImdbUrl(imdbUrlValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(imdbIdValue) => {
          setImdbId(imdbIdValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={() => onAdd({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            })}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
