import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // to reset touched status of all the `Field`s

  const makeChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (v: string) =>
      setter(v);

  const t = title.trim();
  const d = description.trim();
  const iu = imgUrl.trim();
  const mu = imdbUrl.trim();
  const id = imdbId.trim();

  const isFormValid = t !== '' && iu !== '' && mu !== '' && id !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!t || !iu || !mu || !id) {
      return;
    }

    onAdd({
      title: t,
      description: d,
      imgUrl: iu,
      imdbUrl: mu,
      imdbId: id,
    });
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(c => c + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={makeChange(setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={makeChange(setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={makeChange(setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={makeChange(setImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={makeChange(setImdbId)}
        required
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
