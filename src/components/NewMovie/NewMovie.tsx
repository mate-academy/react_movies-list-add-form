/* eslint-disable no-console */
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

  const patternCheck = (str: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(str);
  };

  const isEmptyValue = () => {
    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      setTitle(title.trim());
      setImgUrl(imgUrl.trim());
      setImdbUrl(imdbUrl.trim());
      setId(imdbId.trim());

      return true;
    }

    return false;
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmptyValue()) {
      return;
    }

    if (!patternCheck(imgUrl)) {
      setImgUrl('');

      return;
    }

    if (!patternCheck(imdbUrl)) {
      setImdbUrl('');

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(() => ([
      ...listMovie,
      newMovie,
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
    setIsDisable(!(title && imgUrl && imdbUrl && imdbId));
  }, [title, imgUrl, imdbUrl, imdbId]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmit}
    >
      <h2 className="title">Add a movie</h2>
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
