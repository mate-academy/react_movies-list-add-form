import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const basicValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState(basicValues);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValues;

  const doReset = () => {
    setCount(current => current + 1);
    setFormValues(() => (basicValues));
  };

  const handleChange = (value: string, nameOfValue: string) => {
    setFormValues({ ...formValues, [nameOfValue]: value });
  };

  const allFilled = !!title.trim()
    && !!imgUrl.trim()
    && !!imdbUrl.trim()
    && !!imdbId.trim();

  const handleSubmit = () => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!imgUrl.match(pattern)) {
      setFormValues(prevValues => ({
        ...prevValues,
        imgUrl: '',
      }));

      return;
    }

    if (!imdbUrl.match(pattern)) {
      setFormValues(prevValues => ({
        ...prevValues,
        imdbUrl: '',
      }));

      return;
    }

    const newMovie = {
      title: formValues.title,
      description: formValues.description,
      imgUrl: formValues.imgUrl,
      imdbUrl: formValues.imdbUrl,
      imdbId: formValues.imdbId,
    };

    onAdd(newMovie);
    doReset();
  };

  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={submit}
            disabled={!allFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
