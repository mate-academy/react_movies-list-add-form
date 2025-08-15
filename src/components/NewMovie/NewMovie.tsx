import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');
  const [imbdURL, setImbdURL] = useState<string>('');
  const [imbdId, setImbdId] = useState<string>('');
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const validateForm =
    title.trim() !== '' &&
    imageURL.trim() !== '' &&
    imbdURL.trim() !== '' &&
    imbdId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        imgUrl: imageURL.trim(),
        imdbUrl: imbdURL.trim(),
        imdbId: imbdId.trim(),
      });

      setTitle('');
      setDescription('');
      setImageURL('');
      setImbdURL('');
      setImbdId('');

      setCount(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageURL}
        onChange={value => {
          setImageURL(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdURL}
        onChange={value => {
          setImbdURL(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        onChange={value => {
          setImbdId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validateForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
