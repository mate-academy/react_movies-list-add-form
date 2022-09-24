import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validateUrls } from '../../utils/validation';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isUrlFieldsTrue, setUrlFieldsTrue] = useState({
    imgUrlTrue: false,
    imdbUrlTrue: false,
  });

  const isUrl = true;
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(current => current + 1);
  };

  const handleSubmitButton = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  const isFieldsWithoutErrors = title && imgUrl && imdbUrl && imdbId
   && isUrlFieldsTrue.imdbUrlTrue && isUrlFieldsTrue.imgUrlTrue;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => event.preventDefault()}
    >
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
        onChange={setImageUrl}
        validateUrls={validateUrls}
        isUrl={isUrl}
        setUrlFieldsTrue={setUrlFieldsTrue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validateUrls={validateUrls}
        isUrl={isUrl}
        setUrlFieldsTrue={setUrlFieldsTrue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmitButton}
            disabled={!isFieldsWithoutErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
