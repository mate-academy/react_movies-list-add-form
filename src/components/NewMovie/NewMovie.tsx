import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../utils/patterns';

type Props = {
  onAdd: (movie: Movie) => void;
};

const validationUrl = (string: string): boolean => {
  return pattern.test(string);
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbIdValid, setIsImdbIdValid] = useState(false);

  const isAllChackedFieldsValid = Boolean(!isImgUrlValid && !isImdbIdValid);
  const isAllowSubmit = Boolean(title && imgUrl && imdbUrl && imdbId
    && isAllChackedFieldsValid);

  const addMovie = () => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setCount(current => current + 1);

    onAdd(newMovie);

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
      onSubmit={addMovie}
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
        onChange={setImgUrl}
        validator={validationUrl}
        isValid={isImgUrlValid}
        setIsValid={setIsImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validator={validationUrl}
        isValid={isImdbIdValid}
        setIsValid={setIsImdbIdValid}
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
            disabled={!isAllowSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
