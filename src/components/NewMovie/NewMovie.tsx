import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState(initialMovieState);

  const handleInputChange = (key: string, value: string) => {
    setMovie(prev => ({ ...prev, [key]: value }));
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const resetForm = () => {
    setMovie(initialMovieState);
  };

  // const [urlIsValid, ]

  const handleDisabled = () => {
    // if (title.trim()
    // && imdbId.trim()
    // && pattern.test(imgUrl)
    // && pattern.test(imdbUrl)) {
    //   return false;
    // }
    if (title.trim() && imgUrl && imdbId.trim() && imdbUrl) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // if (title.trim().length < 1) {
    //   alert('incorrect title');

    //   return;
    // }

    // if (imdbId.trim().length < 1) {
    //   alert('incorrect imdbId');

    //   return;
    // }

    // if (!pattern.test(imgUrl)) {
    //   alert('incorrect imgUrl');

    //   return;
    // }

    // if (!pattern.test(imdbUrl)) {
    //   alert('incorrect imdbUrl');

    //   return;
    // }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(prevValue => prevValue + 1);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        pattern={!imgUrl || pattern.test(imgUrl)}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        pattern={!imdbUrl || pattern.test(imdbUrl)}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={handleInputChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={handleDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
