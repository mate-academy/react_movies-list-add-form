import { FormEvent, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (arg: ()=> Movie[]) => void;
  listMovie: Movie[];
};

export const NewMovie: React.FC<Props> = ({ onAdd, listMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setId] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(imgUrl)) {
      setImgUrl('');

      return;
    }

    if (!pattern.test(imdbUrl)) {
      setImdbUrl('');

      return;
    }

    onAdd(() => ([
      ...listMovie,
      {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      },
    ]));
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setId('');
    setCount(prev => prev + 1);
    event.currentTarget.reset();
  };

  useEffect(() => {
    setIsDisable(Boolean(title && imgUrl && imdbUrl && imdbId));
  }, [title, imgUrl, imdbUrl, imdbId]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmit}
    >
      <h2 className="title">Add a movie</h2>
      {isDisable && (
        <button
          type="button"
          onClick={() => {
            setTitle('The Umbrella Academy');
            setDescription(`A family of former child heroes,
          now grown apart, must reunite to
          continue to protect the world.`);
            setImgUrl('https://m.media-amazon.com/images/'
          + 'M/MV5BNTZlNTY4ZGMtMzJjZC00NWFkLWFkZjItZ'
          + 'Dc2Y2Y1NGUyNzFhXkEyXkFqcGdeQXVyMTE5MTg5NDIw.'
          + '_V1_QL75_UX380_CR0,4,380,562_.jpg');
            setImdbUrl('https://www.imdb.com/title/tt1312171/');
            setId('tt1312171');
          }}
        >
          add Sample for test
        </button>
      )}

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(str) => setTitle(str)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={str => setDescription(str)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={str => setImgUrl(str)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={str => setImdbUrl(str)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={str => setId(str)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
