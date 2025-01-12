import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const pattern = new RegExp(
    '^(' +
      '(([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[^\\s]*)?' +
      '\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,.!/\\\\\\w]*))?' +
      ')$',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid =
      title !== '' && imgUrl !== '' && imdbUrl !== '' && imdbId !== '';
    const imgUrlValid = pattern.test(imgUrl);
    const imdbUrlValid = pattern.test(imdbUrl);

    setIsImgUrlValid(imgUrlValid);
    setIsImdbUrlValid(imdbUrlValid);

    if (!isFormValid || !isImgUrlValid || !isImdbUrlValid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => setImgUrl(newValue)}
        required
        validation={value => pattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => setImdbUrl(newValue)}
        required
        validation={value => pattern.test(value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imdbId || !isImgUrlValid || !isImdbUrlValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
