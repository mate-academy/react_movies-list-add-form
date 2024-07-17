import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [valueTitle, setValueTitle] = useState('');
  const [valueDesc, setValueDesc] = useState('');
  const [valueImg, setValueImg] = useState('');
  const [valueUrl, setValueUrl] = useState('');
  const [valueId, setValueId] = useState('');
  const [count, setCount] = useState(0);

  const isValid =
    valueTitle.trim() && valueImg.trim() && valueUrl.trim() && valueId.trim();

  const reset = () => {
    setValueTitle('');
    setValueDesc('');
    setValueImg('');
    setValueUrl('');
    setValueId('');
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prev => prev + 1);

    onAdd({
      title: valueTitle,
      description: valueDesc,
      imgUrl: valueImg,
      imdbUrl: valueUrl,
      imdbId: valueId,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleOnSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

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
        value={valueDesc}
        onChange={setValueDesc}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImg}
        required
        onChange={setValueImg}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueUrl}
        required
        onChange={setValueUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueId}
        required
        onChange={setValueId}
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
