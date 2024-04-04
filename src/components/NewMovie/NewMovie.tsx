import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [valueTitle, setValueTitle] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueImgUrl, setValueImgUrl] = useState('');
  const [valueImdbUrl, setValueImdbUrl] = useState('');
  const [valueImdbId, setValueImdbId] = useState('');
  const isButtonUse =
    !valueTitle.trim() ||
    !valueImgUrl.trim() ||
    !valueImdbUrl.trim() ||
    !valueImdbId.trim();

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isButtonUse) {
      return;
    }

    onAdd({
      title: valueTitle,
      description: valueDescription,
      imgUrl: valueImgUrl,
      imdbUrl: valueImdbUrl,
      imdbId: valueImdbId,
    });
    setValueTitle('');
    setValueDescription('');
    setValueImgUrl('');
    setValueImdbUrl('');
    setValueImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={val => {
          setValueTitle(val);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={valueDescription}
        onChange={val => {
          setValueDescription(val);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImgUrl}
        onChange={val => {
          setValueImgUrl(val);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueImdbUrl}
        onChange={val => {
          setValueImdbUrl(val);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueImdbId}
        onChange={val => {
          setValueImdbId(val);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonUse}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
