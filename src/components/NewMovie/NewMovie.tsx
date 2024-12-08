import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const InitialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const imageURLPattern =
  // eslint-disable-next-line
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface IProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<IProps> = ({ onAdd }) => {
  const [state, setState] = useState({ ...InitialState });

  const { title, imgUrl, imdbUrl, imdbId, description } = state;
  const isValid = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd(state);

    setState({ ...InitialState });
  };

  return (
    <form className="NewMovie" onChange={handleChange} onSubmit={handleSumbit}>
      <h2 className="title">Add a movie</h2>

      <TextField name="title" label="Title" value={state.title} required />

      <TextField name="description" value={description} label="Description" />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        pattern={imageURLPattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        pattern={imageURLPattern}
      />

      <TextField name="imdbId" label="Imdb ID" value={imdbId} required />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
