import { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { validationUrl } from '../../validation';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isImgUrlValid
      && isImdbUrlValid
      && title.trim() !== ''
      && imgUrl.trim() !== ''
      && imdbUrl.trim() !== ''
      && imdbId.trim() !== '');
  }, [title, imgUrl, imdbUrl, imdbId, isImgUrlValid, isImdbUrlValid]);

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setIsImgUrlValid(validationUrl(newValue));
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setIsImdbUrlValid(validationUrl(newValue));
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
  };

  const clearFormFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        setCount(current => current + 1);

        onAdd({
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        });

        clearFormFields();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        validationUrl={validationUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        validationUrl={validationUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
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
