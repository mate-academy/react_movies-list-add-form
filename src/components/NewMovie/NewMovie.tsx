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

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imbdUrlValue, setImbdUrlValue] = useState('');
  const [imbdIdValue, setImbdIdValue] = useState('');

  const increaseCount = () => {
    setCount((prevCount) => {
      const counter = prevCount + 1;

      return counter;
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onAdd({
          title: titleValue,
          imgUrl: imgUrlValue,
          imdbUrl: imbdUrlValue,
          imdbId: imbdIdValue,
          description: descriptionValue,
        });

        increaseCount();
        setTitleValue('');
        setImgUrlValue('');
        setImbdUrlValue('');
        setImbdIdValue('');
        setDescriptionValue('');
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(value) => setTitleValue(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(value) => setDescriptionValue(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(value) => setImgUrlValue(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdUrlValue}
        onChange={(value) => setImbdUrlValue(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdIdValue}
        onChange={(value) => setImbdIdValue(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">

          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !titleValue && !imgUrlValue && !imbdIdValue && !imbdUrlValue
            }
          >
            Add
          </button>

        </div>
      </div>
    </form>
  );
};
