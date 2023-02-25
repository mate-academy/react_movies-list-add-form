import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  // const handleTitileChange = (event: React.ChangeEvent) => {
  //   const { value } = even
  // }

  const createNewMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId: imbdId,
  };

  // eslint-disable-next-line no-useless-escape, max-len

  const removeField = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImbdId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(createNewMovie);

    removeField();

    setCount(current => current + 1);
  };

  const submitBtnUnabled = title && imgUrl && imbdId && imdbUrl;

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
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
        value={imgUrl}
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        onChange={setImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!submitBtnUnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
