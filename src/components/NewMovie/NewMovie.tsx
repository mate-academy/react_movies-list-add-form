import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const pattern = new RegExp(
  [
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|',
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  ].join(''),
);

type Props = {
  onAdd: (arg0: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formFields, setFormFields] = useState(defaultValues);

  const handleChange = (value: string, name: keyof Movie) => {
    setFormFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formFields);
    setFormFields(defaultValues);
    setCount(count + 1);
  };

  const isValid = () => {
    const { title, imdbId, imgUrl, imdbUrl } = formFields;

    return (
      title.trim() &&
      imdbId.trim() &&
      imgUrl.trim() &&
      imdbUrl.trim() &&
      pattern.test(imdbUrl) &&
      pattern.test(imdbUrl)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formFields.title}
        onChange={value => handleChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formFields.description}
        onChange={value => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formFields.imgUrl}
        onChange={value => handleChange(value, 'imgUrl')}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formFields.imdbUrl}
        onChange={value => handleChange(value, 'imdbUrl')}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formFields.imdbId}
        onChange={value => handleChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
