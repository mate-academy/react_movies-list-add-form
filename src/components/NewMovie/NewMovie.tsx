import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFields: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [fields, setFields] = useState(initialFields);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = fields;

  const increaseCount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(fields);

    setCount((current: number) => current + 1);
    setFields(initialFields);
  };

  const handlerValue = (field: string, value: string) => {
    setFields(prevProps => ({
      ...prevProps,
      [field]: value,
    }));
  };

  const IsEntered
  = title.trim()
  && imgUrl.trim()
  && imdbUrl.trim()
  && imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={increaseCount}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handlerValue('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handlerValue('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handlerValue('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handlerValue('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handlerValue('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!IsEntered}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
