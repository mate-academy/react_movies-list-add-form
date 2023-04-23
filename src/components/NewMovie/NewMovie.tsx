import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie:Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [validImgUrl, setValidImgUrl] = useState(true);
  const [validImdbUrl, setValidImdbUrl] = useState(true);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isValidUrl = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return false;
    }

    return true;
  };

  const clearData = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const submitButton = (
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim()
  );

  const hadleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidImgUrl(isValidUrl(imgUrl));
    setValidImdbUrl(isValidUrl(imdbUrl));

    if (isValidUrl(imgUrl) && isValidUrl(imdbUrl)) {
      onAdd(movie);
      clearData();
      setCount(prevCount => prevCount + 1);
    }
  };

  const onChange = (newValue: string, inputName: string) => {
    setMovie({
      ...movie,
      [inputName]: newValue,
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={hadleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChange}
        validation={validImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange}
        validation={validImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!submitButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
