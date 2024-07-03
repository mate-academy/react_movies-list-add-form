import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, SetCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const BUTTONDESABLED = title && imgUrl && imdbUrl && imdbId;
  const FALSEONSUBMIT = !title || !description || !imgUrl || !imdbUrl || !imdbId;

  function updateButton() {
    if (BUTTONDESABLED) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    if (FALSEONSUBMIT) {
      return;
    }

    SetCount(prev => prev + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setButtonDisabled(false);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => {
          setTitle(newValue);
          updateButton();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => {
          setDescription(newValue);
          updateButton();
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => {
          setImgUrl(newValue);
          updateButton();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={(newValue: string) => {
          setImdbUrl(newValue);
          updateButton();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={(newValue: string) => {
          setImdbId(newValue);
          updateButton();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
