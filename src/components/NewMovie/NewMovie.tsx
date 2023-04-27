import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const onChange = (name: string, value: string): void => {
    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'description':
        setDescription(value);
        break;

      case 'imgUrl':
        setImgUrl(value);
        break;

      case 'imdbUrl':
        setImdbUrl(value);
        break;

      case 'imdbId':
        setImdbId(value);
        break;

      default:
        setTitle('');
    }

    const allInputAreValid = title
      && pattern.test(imgUrl) && pattern.test(imdbUrl) && imdbId;

    if (allInputAreValid) {
      setIsDisabled(false);
    }
  };

  const addMovie = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(movie);
      setCount(prevCount => prevCount + 1);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setIsDisabled(true);
    }
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange}
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
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
