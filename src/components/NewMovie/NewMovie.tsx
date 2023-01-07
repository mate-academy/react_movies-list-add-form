import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd:(movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isTitle, setTitle] = useState('');
  const [isDescription, setDescription] = useState('');
  const [isImgUrl, setImgUrl] = useState('');
  const [isImdbUrl, setImdbUrl] = useState('');
  const [isImdbId, setImdbId] = useState('');

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isFieldsAreFill = !isTitle
  || !isImgUrl
  || !isImdbUrl
  || !isImdbId;

  const validationUrl = (link: string): boolean => {
    return (link.match(pattern) || [])[0] === link;
  };

  function clearForm() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  function hendleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (isImdbUrl.match(pattern) && isImgUrl.match(pattern)) {
      const newMovie = {
        title: isTitle,
        description: isDescription,
        imgUrl: isImgUrl,
        imdbUrl: isImdbUrl,
        imdbId: isImdbId,
      };

      onAdd(newMovie);
      clearForm();

      setCount(count + 1);
    }
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={isTitle}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={isDescription}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={isImgUrl}
        onChange={setImgUrl}
        required
        validationUrl={validationUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={isImdbUrl}
        onChange={setImdbUrl}
        required
        validationUrl={validationUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={isImdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={hendleSubmit}
            disabled={isFieldsAreFill}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
