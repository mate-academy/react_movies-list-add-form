import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie:Movie) => void
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovieInfo, setNewMovieInfo] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovieInfo;

  const isInputEmpty
    = !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  /* eslint-disable max-len */
  const pattern
     = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleChange = (name:string, value:string) => {
    setNewMovieInfo(prevData => (
      {
        ...prevData,
        [name]: value,
      }
    ));
  };

  const reset = () => {
    setNewMovieInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setImgUrlError(false);
    setImdbUrlError(false);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setImgUrlError(!pattern.test(imgUrl));
    setImdbUrlError(!pattern.test(imdbUrl));

    if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
      return;
    }

    onAdd(newMovieInfo);

    setCount(prevCount => prevCount + 1);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(name, value) => handleChange(name, value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        urlError={imgUrlError}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        urlError={imdbUrlError}
        onChange={(name, value) => handleChange(name, value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(name, value) => handleChange(name, value)}
        required

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInputEmpty}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
