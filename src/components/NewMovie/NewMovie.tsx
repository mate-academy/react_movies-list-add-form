import { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [imgUrlError, setImgUrlError] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState('');

  useEffect(() => {
    if (title.trim() && imgUrl.trim()
      && imdbUrl.trim() && imdbId.trim()
      && !imgUrlError && !imdbUrlError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [title, imgUrl, imdbUrl, imdbId, imgUrlError, imdbUrlError]);

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const errorImgUrlHandler = (value: string) => {
    if (!pattern.test(String(value).toLowerCase())) {
      setImgUrlError('Img Url is not valid');
    } else {
      setImgUrlError('');
    }
  };

  const errorImdbUrlHandler = (value: string) => {
    if (!pattern.test(String(value).toLowerCase())) {
      setImdbUrlError('Imdb URL is not valid');
    } else {
      setImdbUrlError('');
    }
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(newMovie);
    resetFields();
    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value); errorImgUrlHandler(value);
        }}
        required
      />

      {imgUrlError && (
        <p
          style={{
            color: 'red',
            textDecoration: 'underlined',
            marginBottom: '10px',
          }}
        >
          {imgUrlError}
        </p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value); errorImdbUrlHandler(value);
        }}
        required
      />

      {imdbUrlError && (
        <p style={{
          color: 'red',
          textDecoration: 'underlined',
          marginBottom: '10px',
        }}
        >
          {imdbUrlError}
        </p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
