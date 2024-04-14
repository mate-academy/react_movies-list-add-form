import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [titleValue, SetTitleValue] = useState('');
  const [descriptionValue, SetDescriptionValue] = useState('');
  const [imgUrlValue, SetImgUrlValue] = useState('');
  const [imdbUrlValue, SetImdbUrlValue] = useState('');
  const [imdbIdValue, SetImdbIdValue] = useState('');

  const [count, SetCount] = useState(0);

  const fieldValue =
    !titleValue || !imgUrlValue || !imdbUrlValue || !imdbIdValue;

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    SetTitleValue('');
    SetDescriptionValue('');
    SetImgUrlValue('');
    SetImdbUrlValue('');
    SetImdbIdValue('');
    SetCount(counts => counts + 1);

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleAdd}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={SetTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={SetDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={SetImgUrlValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={SetImdbUrlValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={SetImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={fieldValue}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
