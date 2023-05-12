import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');

  const isTrueInputValue = title && imgUrl && imdbId && imdbUrl;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isTrueInputValue) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
    }

    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  };

  const handledTitle = (value:string) => {
    setTitle(value);
  };

  const handledDescription = (value:string) => {
    setDescription(value);
  };

  const handleImgUrl = (value:string) => {
    setImgUrl(value);
  };

  const handledImdbId = (value:string) => {
    setImdbId(value);
  };

  const handleImdbUrl = (value:string) => {
    setImdbUrl(value);
  };

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
        onChange={handledTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handledDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handledImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">

          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isTrueInputValue}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
