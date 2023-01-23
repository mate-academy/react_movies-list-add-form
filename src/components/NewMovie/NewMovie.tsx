import {
  FC, FormEvent, memo, useState,
} from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: FC<Props> = memo(
  ({ onAdd }) => {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imdbUrl, setImdbUrl] = useState('');
    const [imdbId, setImdbId] = useState('');
    const [isImgUrlValid, setIsImgUrlValid] = useState(true);
    const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
        setIsImgUrlValid(pattern.test(imgUrl));

        setIsImdbUrlValid(pattern.test(imdbUrl));

        return;
      }

      const newMovie = {
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
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');

      setCount(prev => prev + 1);
    };

    const isPossibleToSubmit = title.trim()
     && imgUrl.trim()
     && imdbUrl.trim()
     && imdbId.trim();

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
          isImgUrlValid={isImgUrlValid}
          setIsImgUrlValid={setIsImgUrlValid}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          onChange={setImdbUrl}
          isImbdUrlValid={isImdbUrlValid}
          setIsImdbUrlValid={setIsImdbUrlValid}
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
              disabled={!isPossibleToSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  },
);
