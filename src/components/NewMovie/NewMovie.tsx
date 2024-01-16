import React from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const InitialFieldsOfMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void,
};

type Field =
'title'
| 'description'
| 'imgUrl'
| 'imdbUrl'
| 'imdbId';

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = React.useState(0);
  const [fieldsOfMovie, setFieldsOfMovie] = React
    .useState(InitialFieldsOfMovie);

  const isDisabled = !(
    fieldsOfMovie.title
    && fieldsOfMovie.imgUrl
    && fieldsOfMovie.imdbUrl
    && fieldsOfMovie.imdbId);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: fieldsOfMovie.title,
      description: fieldsOfMovie.description,
      imgUrl: fieldsOfMovie.imgUrl,
      imdbUrl: fieldsOfMovie.imdbUrl,
      imdbId: fieldsOfMovie.imdbId,
    });

    setCount((prevValue) => prevValue + 1);
    setFieldsOfMovie(InitialFieldsOfMovie);
  };

  const changeFieldHandler = (name: Field, value: string) => {
    setFieldsOfMovie(prevFields => ({ ...prevFields, [name]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fieldsOfMovie.title}
        onChange={(value) => changeFieldHandler('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fieldsOfMovie.description}
        onChange={(value) => changeFieldHandler('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fieldsOfMovie.imgUrl}
        onChange={(value) => changeFieldHandler('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fieldsOfMovie.imdbUrl}
        onChange={(value) => changeFieldHandler('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fieldsOfMovie.imdbId}
        onChange={(value) => changeFieldHandler('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
