import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  );

  const [values, setValues] = useState(defaultValues);
  const [count, setCount] = useState(0);

  const isTitleValid = values.title.trim().length > 0;
  const isImgUrlValid = values.imgUrl.trim().length > 0;
  const isImdbUrlValid = values.imdbUrl.trim().length > 0;
  const isImdbIdValid = values.imdbId.trim().length > 0;

  const isButtonEnabled =
    isTitleValid && isImgUrlValid && isImdbUrlValid && isImdbIdValid;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isButtonEnabled) {
      return;
    }

    onAdd({
      title: values.title.trim(),
      description: values.description.trim(),
      imgUrl: values.imgUrl.trim(),
      imdbUrl: values.imdbUrl.trim(),
      imdbId: values.imdbId.trim(),
    });

    setValues(defaultValues);
    setCount(prev => prev + 1);
  };

  const validateUrl = (value: string) => {
    if (!value) {
      return null;
    }

    if (!pattern.test(value)) {
      return 'Invalid URL format';
    }

    return null;
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={value => setValues({ ...values, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={value => setValues({ ...values, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={value => setValues({ ...values, imgUrl: value })}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={value => setValues({ ...values, imdbUrl: value })}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={value => setValues({ ...values, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
