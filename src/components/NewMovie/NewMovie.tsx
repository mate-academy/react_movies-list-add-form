import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imbdURL, setImbdURL] = useState('');
  const [imbdID, setImbdID] = useState('');
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const isValid = Boolean(
    title.trim() && imageURL.trim() && imbdURL.trim() && imbdID.trim(),
  );

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setImbdURL('');
    setImbdID('');
    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imageURL.trim(),
      imdbUrl: imbdURL.trim(),
      imdbId: imbdID.trim(),
    });

    reset();
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
        value={imageURL}
        required
        onChange={setImageURL}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdURL}
        onChange={setImbdURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdID}
        onChange={setImbdID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
