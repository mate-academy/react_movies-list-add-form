import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd(movie: Movie): void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isImdbUrlWrong, setIsImdbUrlWrong] = useState(false);
  const [isImgUrlWrong, setIsImgUrlWrong] = useState(false);

  const [movie, setMovieData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetForm = () => {
    setMovieData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    let isThereWrongUrls = false;

    if (!pattern.test(movie.imdbUrl.trim())) {
      setIsImdbUrlWrong(true);
      isThereWrongUrls = true;
    }

    if (!pattern.test(movie.imgUrl.trim())) {
      setIsImgUrlWrong(true);
      isThereWrongUrls = true;
    }

    if (isThereWrongUrls) {
      return;
    }

    setCount(count + 1);

    onAdd(movie);

    resetForm();
  };

  useEffect(() => {
    if (movie.title.trim() && movie.imdbId.trim()
      && movie.imdbUrl.trim() && movie.imgUrl.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovieData({ ...movie, [name]: value });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => handleChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => handleChange(event)}
        urlChecker={{
          isUrlWrong: isImgUrlWrong,
          setIsUrlWrong: setIsImgUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => handleChange(event)}
        urlChecker={{
          isUrlWrong: isImdbUrlWrong,
          setIsUrlWrong: setIsImdbUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => handleChange(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
