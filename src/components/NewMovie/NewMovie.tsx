import {
  FC,
  FormEvent,
  useCallback,
  useState,
} from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const isButtonDisabled = !title
    || !imgUrl || !isImgUrlValid
    || !imdbUrl || !isImdbUrlValid
    || !imdbId;

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(current => current + 1);
  }

  const isUrlValid = useCallback((newValue: string): boolean => {
    const pattern = new RegExp('^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,'
      + '\\w]+@)?[A-Za-z0-9.-]+|(?:www'
      + '\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:'
      + '\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.'
      + '\\w_]*)#?(?:[,.!/\\\\\\'
      + 'w]*))?)$');

    return pattern.test(newValue);
  }, []);

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
        setNewValue={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        setNewValue={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        setNewValue={setImgUrl}
        isFormatValid={isImgUrlValid}
        setIsFormatValid={setIsImgUrlValid}
        isFieldValidCustom={isUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        setNewValue={setImdbUrl}
        isFormatValid={isImdbUrlValid}
        setIsFormatValid={setIsImdbUrlValid}
        isFieldValidCustom={isUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        setNewValue={setImdbId}
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
