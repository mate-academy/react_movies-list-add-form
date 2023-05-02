import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie[]) => void;
  movies: Movie[];
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);
  const [isInvalidImg, setIsInvalidImg] = useState(false);
  const [isInvalidImdb, setIsInvalidImdb] = useState(false);

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const hendlerSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!pattern.test(imgUrl)) {
      setIsInvalidImg(true);

      return;
    }

    if (!pattern.test(imdbUrl)) {
      setIsInvalidImdb(true);

      return;
    }

    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    onAdd([...movies, newFilm]);

    setCount(count + 1);
  };

  const isAllEntered = (
    title !== '' && imgUrl !== '' && imdbUrl !== '' && imdbId !== ''
  );

  return (
    <form
      className="NewMovie"
      onSubmit={hendlerSubmit}
      key={count}
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
        isInvalid={isInvalidImg}
        setIsInvalid={setIsInvalidImg}
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        isInvalid={isInvalidImdb}
        setIsInvalid={setIsInvalidImdb}
        value={imdbUrl}
        onChange={setImdbUrl}
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
            disabled={!isAllEntered}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
