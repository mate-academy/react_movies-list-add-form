import { FC, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Input, Submit } from '../../types/events';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isDataMovie, setIsDataMovie] = useState(false);
  const [isImgUrl, setIsImgUrl] = useState(!!newMovie.imgUrl);
  const [isImdbUrl, setIsImdbUrl] = useState(!!newMovie.imdbUrl);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  useEffect(() => {
    if (
      !!newMovie.title
      && !!newMovie.imgUrl
      && !!newMovie.imdbUrl
      && !!newMovie.imdbId
    ) {
      setIsDataMovie(true);

      return;
    }

    setIsDataMovie(false);
  }, [
    newMovie.title,
    newMovie.imgUrl,
    newMovie.imdbUrl,
    newMovie.imdbId,
  ]);

  const clearFields = () => setNewMovie({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: Input) => {
    const { name, value } = e.target;

    if (name === 'imgUrl' && isImgUrl) {
      setIsImgUrl(false);
    }

    if (name === 'imdbUrl' && isImdbUrl) {
      setIsImdbUrl(false);
    }

    setNewMovie((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: Submit) => {
    e.preventDefault();

    if (!newMovie.imgUrl.match(pattern)) {
      setIsImgUrl(true);
    }

    if (!newMovie.imdbUrl.match(pattern)) {
      setIsImdbUrl(true);
    }

    if (!newMovie.imdbUrl.match(pattern) || !newMovie.imgUrl.match(pattern)) {
      return;
    }

    onAdd(newMovie);
    setCount(prev => prev + 1);
    clearFields();
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
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
        isUrl={isImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
        isUrl={isImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isDataMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
