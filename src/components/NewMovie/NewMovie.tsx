import { FC, FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFormState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [formState, setFormState] = useState<Movie>(initialFormState);
  const [count, setCount] = useState(0);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const chackedRequiredFields = (...requiredFields: string[]): boolean => {
    let chackResult = true;

    [...requiredFields].forEach(field => {
      chackResult = chackResult && Boolean(field.trim());
    });

    return chackResult;
  };

  const changeFormState = (key: keyof Movie, value: string):void => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setCount((prew) => prew + 1);
    setFormState(initialFormState);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    onAdd(formState);

    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={(value) => changeFormState('title', value)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => changeFormState('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(value) => changeFormState('imgUrl', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(value) => changeFormState('imdbUrl', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(value) => changeFormState('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!chackedRequiredFields(title, imgUrl, imdbUrl, imdbId)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
