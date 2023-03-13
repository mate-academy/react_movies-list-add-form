import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const basicValues = {
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [formValues, setFormValues] = useState({
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    count, title, description, imgUrl, imdbUrl, imdbId,
  } = formValues;

  // const [count, setCount] = useState(0);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');

  const allFilled = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  const doReset = () => {
    setFormValues(() => (basicValues));
  };

  const handleChange = (value: any) => {
    return (setFormValues({ ...formValues, title: value }));
  };

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

      {/* <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeDescr}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeImdbId}
        required */}
      {/* /> */}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event => {
              event.preventDefault();
              handleSubmit();
            })}
            disabled={!allFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
