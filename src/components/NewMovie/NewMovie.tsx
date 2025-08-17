import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isMatchingURL =
    imgUrl.trim().match(pattern) && imdbUrl.trim().match(pattern);

  const handleURLBlur = (query: string) => {
    if (query.trim().match(pattern)) {
      return '';
    }

    return 'Input text is not URL';
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);
    setCount(prev => prev + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={query => {
          setTitle(query);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={query => {
          setDescription(query);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={query => {
          setImgUrl(query);
        }}
        onBlur={handleURLBlur}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={query => {
          setImdbUrl(query);
        }}
        onBlur={handleURLBlur}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={query => setImdbId(query + '')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.trim() ||
              !isMatchingURL
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
