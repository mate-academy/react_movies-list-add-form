import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const titleValidationIssues = (value: string) : boolean => {
    const pattern = /^[A-Z0-9].{1,}$/;

    return !pattern.test(value.trim());
  };

  const urlsValidationIssues = (url: string) : boolean => {
    const pattern = new RegExp(
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
      + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
      + '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?'
      + '(?:[,.!/\\\\\\w]*))?)$',
    );

    return !pattern.test(url.trim());
  };

  const imdbIdValidationIssues = (id: string) : boolean => {
    const pattern = /[A-Za-z]{2}\d{5,}/;
    const match = newMovie.imdbUrl.match(pattern);

    if (match && match[0]) {
      return match[0] !== id;
    }

    return true;
  };

  const isEmptyFields = !newMovie.title
    || !newMovie.imgUrl
    || !newMovie.imdbUrl
    || !newMovie.imdbId;

  const hasValidationIssue = titleValidationIssues(newMovie.title)
    || urlsValidationIssues(newMovie.imgUrl)
    || imdbIdValidationIssues(newMovie.imdbId);

  const handleReset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmptyFields) {
      return;
    }

    if (hasValidationIssue) {
      return;
    }

    onAdd(newMovie);

    setCount(currentCount => currentCount + 1);
    handleReset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
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
        hasValidationIssues={titleValidationIssues}
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
        hasValidationIssues={urlsValidationIssues}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        hasValidationIssues={urlsValidationIssues}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        hasValidationIssues={imdbIdValidationIssues}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isEmptyFields || hasValidationIssue}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
