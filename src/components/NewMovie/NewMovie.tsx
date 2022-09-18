import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, increaseCount] = useState(0);
  const [title, addNewTitle] = useState('');
  const [description, addNewDescription] = useState('');
  const [imgUrl, addNewImgUrl] = useState('');
  const [imdbUrl, addNewImdbUrl] = useState('');
  const [imdbId, addNewImdbId] = useState('');
  const [isUrlsFieldsTrue, setUrlsFieldsTrue] = useState({
    imgUrlTrue: false,
    imdbUrlTrue: false,
  });

  // const [errors, setErrors] = useState({})

  const isUrl = true;

  const handleSubmitButton = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    addNewTitle('');
    addNewDescription('');
    addNewImgUrl('');
    addNewImdbUrl('');
    addNewImdbId('');

    increaseCount(current => current + 1);
  };

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.,\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const validateUrls = (url: string): boolean => pattern.test(url);

  const isFieldsWithoutErrors = title && imgUrl && imdbUrl && imdbId
   && isUrlsFieldsTrue.imdbUrlTrue && isUrlsFieldsTrue.imgUrlTrue;

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
        onChange={addNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={addNewDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={addNewImgUrl}
        validateUrls={validateUrls}
        isUrl={isUrl}
        setUrlsFieldsTrue={setUrlsFieldsTrue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={addNewImdbUrl}
        validateUrls={validateUrls}
        isUrl={isUrl}
        setUrlsFieldsTrue={setUrlsFieldsTrue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={addNewImdbId}
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
