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
  const [valueTitle, setValueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbID, setImdbID] = useState('');
  const [imdbURL, setImdbURL] = useState('');

  const hasError =
    !valueTitle.trim() || !imageURL.trim() || !imdbID.trim() || !imdbURL.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasError) {
      return;
    }

    onAdd({
      title: valueTitle,
      description: description || '',
      imgUrl: imageURL,
      imdbUrl: imdbURL,
      imdbId: imdbID,
    });

    setValueTitle('');
    setDescription('');
    setImageURL('');
    setImdbID('');
    setImdbURL('');

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie </h2>

      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={setValueTitle}
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
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
